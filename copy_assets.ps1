$base = 'c:\Users\ferda\Desktop\GitHub Portfolio\projects'
$srcAssets = 'c:\Users\ferda\Desktop\GitHub Portfolio\assets'

$mappings = [ordered]@{
    'dona-codex-vision-showcase'   = 'dona_codex_vision*'
    'agent-critiq-showcase'        = 'agent_critiq*'
    'dona-codex-overmind-showcase' = 'dona_codex_overmind*'
    'dona-nexus-showcase'          = 'dona_nexus*'
    'ai-prompt-builder-showcase'   = '*prompt_builder*'
    'ai-coin-empire-showcase'      = 'ai_coin_empire*'
    'dona-grid-showcase'           = 'dona_grid*'
    'dona-quantum-showcase'        = 'dona_quantum*'
    'zamani-bekcisi-showcase'      = '*bek*'
    'dona-ai-lab-showcase'         = 'dona_ai_lab*'
}

foreach ($key in $mappings.Keys) {
    $repoDir = Join-Path $base $key
    $assetsDir = Join-Path $repoDir 'assets'
    if (!(Test-Path $assetsDir)) {
        New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
    }
    
    $pattern = $mappings[$key]
    Get-ChildItem $srcAssets -Filter $pattern | ForEach-Object {
        Copy-Item $_.FullName $assetsDir -Force
    }

    # Move showcase md file as README.md inside the repo folder
    $mdFile = Join-Path $base "$key.md"
    if (Test-Path $mdFile) {
        Copy-Item $mdFile (Join-Path $repoDir 'README.md') -Force
    }
}
Write-Host "All 10 showcase project folders populated successfully!"
