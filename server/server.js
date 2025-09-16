require('dotenv').config();
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { OpenAI } = require('openai')
const { HfInference } = require('@huggingface/inference')
const csvParse = require('csv-parse/sync')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const hf = new HfInference(process.env.HF_API_KEY)
const upload = multer({ dest: 'uploads/' })
const app = express()

app.use('/uploads', express.static('uploads'))

app.post('/api/analyze', upload.single('file'), async (req, res) => {
  const file = req.file
  if (!file) return res.status(400).json({ error: 'No file' })
  let result = {}
  try {
    if (file.originalname.endsWith('.mp3')) {
      // 音频转写
      if (!process.env.HF_API_KEY) return res.status(500).json({ error: 'No HuggingFace API Key' })
      const audio = fs.readFileSync(file.path)
      const transcript = await hf.automaticSpeechRecognition({ model: 'openai/whisper-large', data: audio })
      // GPT-4 摘要
      const gptRes = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: '你是专业的UX分析师。' },
          { role: 'user', content: `请对以下用户访谈转录文本进行摘要和情感分析：\n${transcript.text}` }
        ]
      })
      result = {
        transcript: transcript.text,
        summary: gptRes.choices[0].message.content,
        sentiment: '自动情感分析可用GPT或HuggingFace补充',
        audioUrl: `/uploads/${file.filename}`
      }
    } else if (file.originalname.endsWith('.txt')) {
      const text = fs.readFileSync(file.path, 'utf-8')
      const gptRes = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: '你是专业的UX分析师。' },
          { role: 'user', content: `请提取关键词、生成摘要并判断情感色彩：\n${text}` }
        ]
      })
      result = {
        keywords: ['可用GPT或正则提取'],
        summary: gptRes.choices[0].message.content,
        sentiment: '自动情感分析可用GPT或HuggingFace补充'
      }
    } else if (file.originalname.endsWith('.csv')) {
      const csv = fs.readFileSync(file.path, 'utf-8')
      const records = csvParse.parse(csv)
      result = {
        headers: records[0],
        rows: records.slice(1, 6),
        chartData: {},
        analysis: '自动分析结论可用GPT补充'
      }
    }
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log('AI分析服务已启动，端口3001');
});