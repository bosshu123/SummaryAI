# SummaryAI - 文章摘要生成系统

一个基于AI的文章摘要自动生成系统，可以为任何文章内容生成简洁、准确的摘要。

## 特点

- 🚀 实时生成摘要
- 💾 智能缓存机制
- 🎨 美观的UI设计
- 📱 响应式布局
- ⚡ 简单易用的API
- 🔒 支持自定义配置

## 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/bosshu123/SummaryAI.git

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑.env文件，添加你的OpenAI API密钥

```
可选：配置BASE_URL为免费的API地址 如 [GPT-API-free](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file)

### 运行

```bash
# 启动开发服务器
npm run dev
```

### 在你的网站中使用

1. 引入CSS和JavaScript文件：

```html
<link rel="stylesheet" href="path/to/style.css">
<script src="path/to/summary.js"></script>
```

2. 初始化摘要生成器：

```html
<script>
new ArticleSummary({
    selector: '#your-article-content',
    maxLength: 200,
    position: 'before'
});
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| selector | string | '#article-content' | 文章内容的选择器 |
| apiUrl | string | 'http://localhost:3000/api/summary' | API端点URL |
| maxLength | number | 200 | 摘要最大字数 |
| position | string | 'before' | 摘要显示位置（'before'或'after'） |

## API接口

### 生成摘要

```http
POST /api/summary
Content-Type: application/json

{
    "text": "文章内容",
    "maxLength": 200
}
```

响应：

```json
{
    "summary": "生成的摘要内容"
}
```

## 开发

### 项目结构

```
src/
├── api/
│   └── summary.js      # 后端API服务
├── public/
│   ├── index.html      # 示例页面
│   ├── style.css       # 样式文件
│   └── summary.js      # 前端JavaScript
└── utils/
    └── textProcessor.js # 文本处理工具
```

## 许可证

保留所有权利。

### 使用限制
- ✅ 允许个人使用、修改和优化
- ❌ 禁止用于其他项目的商业用途
- ❌ 禁止在未经授权的情况下重新分发