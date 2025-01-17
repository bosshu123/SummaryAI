require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 86400 }); // 缓存24小时

// OpenAI配置
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL,
});

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

// 文本摘要生成API
app.post('/api/summary', async (req, res) => {
  try {
    const { text, maxLength = 200 } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '请提供文本内容' });
    }

    // 检查缓存
    const cacheKey = `summary_${Buffer.from(text).toString('base64')}`;
    const cachedSummary = cache.get(cacheKey);
    
    if (cachedSummary) {
      return res.json({ summary: cachedSummary });
    }

    // 调用AI生成摘要
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一个��业的文章摘要生成助手。���生成简洁、准确的摘要。"
        },
        {
          role: "user",
          content: `请为以下文章生成一个不超过${maxLength}字的摘要：\n\n${text}`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content.trim();
    
    // 存入缓存
    cache.set(cacheKey, summary);
    
    res.json({ summary });
  } catch (error) {
    console.error('生成摘要时出错:', error);
    res.status(500).json({ error: '生成摘要时发生错误' });
  }
});

// 文本评分API
app.post('/api/score', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: '请提供文本内容' });
    }

    // 检查缓存
    const cacheKey = `score_${Buffer.from(text).toString('base64')}`;
    const cachedScore = cache.get(cacheKey);
    
    if (cachedScore) {
      return res.json(cachedScore);
    }

    // 调用AI进行评分分析
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "你是一个专业的文本评分分析助手。请对文本进行多维度评分分析，包括内容质量、结构完整性、语言表达等方面。"
        },
        {
          role: "user",
          content: `请对以下文本进行评分分析，给出1-10的分数并说明理由：\n\n${text}`
        }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const analysis = completion.choices[0].message.content.trim();
    const result = {
      analysis,
      timestamp: new Date().toISOString()
    };
    
    // 存入缓存
    cache.set(cacheKey, result);
    
    res.json(result);
  } catch (error) {
    console.error('评分分析时出错:', error);
    res.status(500).json({ error: '评分分析时发生错误' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
