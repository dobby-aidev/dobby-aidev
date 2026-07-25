<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=4,10,18&height=200&section=header&text=AGENT%20CRITIQ&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=35&desc=The%20%231%20AI%20Discovery%20%26%20Review%20Platform&descAlignY=55&descSize=18" width="100%"/>

<br/>

[![Website](https://img.shields.io/badge/Website-agentcritiq.com-6366f1?style=for-the-badge&logo=globe&logoColor=white)](https://agentcritiq.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MCP Server](https://img.shields.io/badge/MCP_Server-Ready-10b981?style=for-the-badge&logo=anthropic&logoColor=white)](./mcp-server/)
[![Hugging Face](https://img.shields.io/badge/🤗%20Dataset-HuggingFace-FF9D00?style=for-the-badge)](https://huggingface.co/datasets/dobbyb-aidev/agent-critiq-ai-reviews)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> **🕵️ The AI-native discovery and review platform for AI tools, agents, and LLMs.**
> 100+ curated expert reviews, MCP server integration, open dataset on Hugging Face, and GEO-optimized for AI crawlers.

<br/>

</div>

---

## ✨ Overview

**Agent Critiq** is a curated, AI-native **discovery and review platform** covering 100+ AI tools, autonomous agents, and LLMs — with expert ratings, structured data, and a built-in MCP server that lets AI assistants (Claude, Cursor, Copilot) query the database directly.

The platform is designed to be ingested by both **humans and AI systems** — featuring structured JSON-LD, `llms.txt`, open Hugging Face dataset, and explicit AI crawler permissions.

**Live at [agentcritiq.com](https://agentcritiq.com)**

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 📊 **100+ Expert Reviews** | In-depth coverage: coding agents, image generators, autonomous agents, LLMs |
| 🤖 **MCP Server** | Let Claude/Cursor/Copilot query the database with 5 built-in tools |
| 🗂️ **Open Dataset** | Machine-readable catalogue published on Hugging Face |
| 🔍 **GEO Optimized** | `llms.txt`, JSON-LD structured data, AI crawler permissions |
| ⭐ **Verified Reviews** | Curated human + expert review system |
| 🏷️ **Category System** | Organized by use case, pricing tier, and capability |
| 🔄 **Live Updates** | `update_data.cjs` pipeline for keeping reviews current |
| 📢 **Outreach Campaigns** | LinkedIn, Product Hunt, HN, Reddit launch materials included |
| 🌐 **SEO Architecture** | Complete meta tags, sitemap, robots.txt optimized for AI discovery |
| 🧩 **MCP Gallery** | Searchable gallery of MCP-compatible tools |

---

## 🤖 MCP Server Integration

Connect Claude Desktop, Cursor, or any MCP-compatible AI assistant:

```json
{
  "mcpServers": {
    "agent-critiq": {
      "command": "node",
      "args": ["./mcp-server/index.js"]
    }
  }
}
```

**Available MCP Tools:**

| Tool | Description |
|---|---|
| `search_ai_tools` | Full-text search across 100+ tools |
| `get_tool_detail` | Get complete details for any tool |
| `list_categories` | Browse all category taxonomies |
| `get_top_rated` | Retrieve highest-rated tools |
| `compare_tools` | Side-by-side comparison of 2+ tools |

---

## 🛠️ Tech Stack

```
Frontend:      React 18 + TypeScript + Vite
Styling:       Tailwind CSS + Custom components
Data Layer:    JSON-based tool database (update_data.cjs pipeline)
MCP Server:    Node.js (mcp-server/index.js)
Dataset:       Hugging Face Datasets API
SEO:           JSON-LD structured data + llms.txt + sitemap
Scripts:       Node.js CJS migration/update utilities
```

---

## 📁 Project Structure

```
agent-critiq/
├── src/                        # React frontend
├── public/
│   ├── agent-critiq-2026-dataset.json   # Full tools dataset
│   ├── llms.txt                          # AI/LLM crawler index
│   └── sitemap.xml                       # SEO sitemap
├── mcp-server/
│   ├── index.js                # MCP server entry point
│   └── README.md               # MCP setup guide
├── Critiq/                     # Core platform data
├── scripts/                    # Data pipeline scripts
├── update_data.cjs             # Database update pipeline
├── generate_tools.cjs          # Tool card generator
├── badges_outreach_campaign.md # Growth outreach templates
├── product_hunt_hackernews_launch.md  # Launch strategy
└── Linkedin_Setup_Master_Guide_TR.md  # LinkedIn campaign guide
```

---

## ⚡ Quick Start

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/agent-critiq.git
cd agent-critiq

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📦 Open Dataset

The full AI tools catalogue is publicly available:

- **Hugging Face:** [dobbyb-aidev/agent-critiq-ai-reviews](https://huggingface.co/datasets/dobbyb-aidev/agent-critiq-ai-reviews)
- **Direct JSON:** [`public/agent-critiq-2026-dataset.json`](./public/agent-critiq-2026-dataset.json)
- **LLM Index:** [`public/llms.txt`](./public/llms.txt) — for AI/RAG crawlers

---

## 🌐 AI Crawler Permissions

`robots.txt` explicitly welcomes all major AI crawlers:

```
GPTBot ✅ | Google-Extended ✅ | Claude-Web ✅
Applebot-extended ✅ | YouBot ✅ | PerplexityBot ✅
```

---

## 📢 Growth & Launch Materials

The repository includes complete **go-to-market materials**:
- `badges_outreach_campaign.md` — GitHub badge outreach templates
- `product_hunt_hackernews_launch.md` — PH/HN launch strategy
- `social_drafts.txt` — Twitter/LinkedIn post drafts
- `reddit_post_draft.md` — Reddit community posts
- `Linkedin_Setup_Master_Guide_TR.md` — LinkedIn campaign guide

---

## 📜 License

MIT — free to use, fork, and build upon.

**Made with ❤️ by the Agent Critiq team | [agentcritiq.com](https://agentcritiq.com)**

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=4,10,18&height=100&section=footer" width="100%"/>
</div>
