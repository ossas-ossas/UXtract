# UXtract - AI-Powered UX Research Assistant

UXtract 是一个基于 AI 的 UX 研究助手，可以帮助分析用户访谈、眼动追踪数据和其他 UX 研究文件。

## 功能特性

- 🎤 音频文件转录和分析
- 📝 文本文件关键词提取和情感分析
- 📊 CSV 数据可视化和分析
- 🤖 基于 GPT-4 的智能分析
- 📱 现代化的 React 前端界面

## 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd uxtract-mcp
npm install

# 安装服务器依赖
cd ../server
npm install
```

### 环境配置

在项目根目录和 `server` 目录下创建 `.env` 文件：

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# HuggingFace API Key  
HF_API_KEY=your_huggingface_api_key_here

# Server Port
PORT=3001
```

### 启动应用

1. 启动后端服务器：
```bash
cd server
npm start
```

2. 启动前端应用：
```bash
cd uxtract-mcp
npm run dev
```

3. 访问应用：
- 前端：http://localhost:5173
- 后端 API：http://localhost:3001

## 支持的文件格式

- **音频文件**：.mp3（使用 Whisper 进行转录）
- **文本文件**：.txt（关键词提取和情感分析）
- **数据文件**：.csv（数据可视化和分析）

## 技术栈

- **前端**：React 19, Vite, React Router
- **后端**：Node.js, Express
- **AI 服务**：OpenAI GPT-4, HuggingFace Whisper
- **文件处理**：Multer, CSV Parse

## 项目结构

```
UXtract/
├── uxtract-mcp/          # React 前端应用
├── server/               # Express 后端服务器
├── public/               # 静态资源
└── README.md
```

## 开发说明

- 前端开发服务器运行在端口 5173
- 后端 API 服务器运行在端口 3001
- 支持 CORS 跨域请求
- 文件上传目录：`server/uploads/`

## 许可证

ISC