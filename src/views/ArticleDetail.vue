<template>
  <div class="max-w-5xl mx-auto px-6 pt-6 pb-10 space-y-6">
    <div v-if="article">
      <!-- 标题 -->
      <h1 class="text-5xl font-extrabold text-gray-900 leading-tight">
        {{ article.title }}
      </h1>

      <!-- 操作按钮 -->
      <div class="mt-4 mb-6 space-x-4">
        <router-link
          :to="`/edit/${article._id}`"
          class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          编辑
        </router-link>
        <button
          @click="deleteArticle"
          class="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          删除
        </button>
      </div>

      <!-- 正文，直接渲染HTML -->
      <article
        class="ql-editor custom-quill mt-8"
        v-html="article.content"
      ></article>
    </div>

    <p v-else class="text-gray-400">文章加载中...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()
const router = useRouter()
const article = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`)
    if (!res.ok) throw new Error('获取失败')
    const data = await res.json()
    article.value = data
  } catch (err) {
    console.error('加载失败:', err)
    article.value = null
  }
})

async function deleteArticle() {
  if (!confirm('确认删除这篇文章？')) return

  const res = await fetch(`http://localhost:3000/api/articles/${article.value._id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    alert('删除成功')
    router.push('/')
  } else {
    alert('删除失败')
  }
}
</script>