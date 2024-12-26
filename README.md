# SummaryAI - Article Summary Generation System

[English](README.md) | [中文](README_zh.md)

An AI-powered article summary generation system that can create concise and accurate summaries for any article content.

## Features

- 🚀 Real-time summary generation
- 💾 Intelligent caching mechanism
- 🎨 Beautiful UI design
- 📱 Responsive layout
- ⚡ Simple and easy-to-use API
- 🔒 Customizable configuration

## Quick Start

### Installation

```bash
# Clone the project
git clone https://github.com/bosshu123/SummaryAI.git

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file and add your OpenAI API key
```

Optional: Configure BASE_URL to use free API address such as [GPT-API-free](https://github.com/chatanywhere/GPT_API_free?tab=readme-ov-file)

### Running

```bash
# Start development server
npm run dev
```

### Using in Your Website

1. Include CSS and JavaScript files:

```html
<link rel="stylesheet" href="path/to/style.css">
<script src="path/to/summary.js"></script>
```

2. Initialize the summary generator:

```html
<script>
new ArticleSummary({
    selector: '#your-article-content',
    maxLength: 200,
    position: 'before'
});
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| selector | string | '#article-content' | Selector for article content |
| apiUrl | string | 'http://localhost:3000/api/summary' | API endpoint URL |
| maxLength | number | 200 | Maximum summary length |
| position | string | 'before' | Summary display position ('before' or 'after') |

## API Interface

### Generate Summary

```http
POST /api/summary
Content-Type: application/json

{
    "text": "Article content",
    "maxLength": 200
}
```

Response:

```json
{
    "summary": "Generated summary content"
}
```

## Development

### Project Structure

```
src/
├── api/
│   └── summary.js      # Backend API service
├── public/
│   ├── index.html      # Example page
│   ├── style.css       # Style file
│   └── summary.js      # Frontend JavaScript
└── utils/
    └── textProcessor.js # Text processing utilities
```

## License

All rights reserved.

### Usage Restrictions
- ✅ Personal use, modification, and optimization allowed
- ❌ Commercial use in other projects prohibited
- ❌ Redistribution without authorization prohibited