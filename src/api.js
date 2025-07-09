// src/api.js
const API_BASE = 'http://localhost:3000/api'

export async function fetchArticles() {
  const res = await fetch(`${API_BASE}/articles`)
  return await res.json()
}

export async function fetchArticle(slug) {
  const res = await fetch(`${API_BASE}/articles/${slug}`)
  return await res.json()
}