<template>
  <div class="max-w-5xl mx-auto px-6 py-10 space-y-6">
    <router-link to="/" class="text-blue-600 hover:underline text-sm">&larr; 返回首页</router-link>

    <div v-if="article">
      <h1 class="text-4xl font-bold text-gray-900 leading-snug">
        {{ article.title }}
      </h1>

      <article
        class="prose prose-lg max-w-none leading-relaxed mt-6
              prose-headings:text-gray-800
              prose-a:text-blue-600 hover:prose-a:underline
              prose-img:rounded-lg shadow
              prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:text-gray-600 
              prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
              prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
              prose-li:marker:text-gray-400
              prose-strong:text-black
              "
        v-html="html"
      />
    </div>

    <p v-else class="text-gray-400">文章加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const article = ref(null)
const html = ref('')

onMounted(async () => {
  const id = route.params.id
  console.log('当前文章 ID:', id)

  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`)
    if (!res.ok) throw new Error('获取失败')

    const data = await res.json()
    console.log('文章数据:', data)

    article.value = data
    html.value = marked.parse(data.content || '')
  } catch (err) {
    console.error('加载失败:', err)
    article.value = null
    html.value = '<p class="text-red-500">加载失败</p>'
  }
})
</script>