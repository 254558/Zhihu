const express = require('express')
const router = express.Router()
const Article = require('../models/Article')

// GET /api/articles
router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ date: -1 })
  res.json(articles)
})

// GET /api/articles/:id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).send('Not found')
    res.json(article)
  } catch (err) {
    res.status(400).json({ error: '无效的文章 ID' })
  }
})

// POST /api/articles
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date || new Date(),
  })
  try {
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/articles/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Article.findByIdAndDelete(req.params.id)
    if (!result) return res.status(404).json({ error: '文章不存在' })
    res.json({ success: true })
  } catch (err) {
    res.status(400).json({ error: '删除失败：ID 无效' })
  }
})

// PUT /api/articles/:id
router.put('/:id', async (req, res) => {
  try {
    const result = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!result) return res.status(404).json({ error: '文章不存在' })
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: '更新失败：ID 无效' })
  }
})

module.exports = router