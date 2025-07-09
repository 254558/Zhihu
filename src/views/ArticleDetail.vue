<template>
  <div class="max-w-5xl mx-auto px-6 py-10 space-y-6">
    <router-link to="/" class="text-blue-600 hover:underline text-sm">&larr; 返回首页</router-link>

    <div v-if="article">
      <h1 class="text-5xl font-extrabold text-gray-900 leading-tight">
        {{ article.title }}
      </h1>

      <article
        class="prose max-w-none mt-8 text-xl leading-9 space-y-8"
        v-html="html"
      ></article>
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