<template>
  <div class="max-w-4xl mx-auto p-6 space-y-4">

    <table class="w-full border text-left">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">标题</th>
          <th class="p-2"></th>
          <th class="p-2">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article._id" class="border-t">
        <td class="p-2">{{ article.title }}</td>
        <td class="p-2">{{ article.summary }}</td>
        <td class="p-2 space-x-2">
            <router-link 
              :to="`/edit/${article._id}`" 
              class="inline-flex items-center px-3 py-1.5 border border-blue-300 text-blue-700 bg-blue-50 rounded-md text-sm font-medium hover:bg-blue-100 transition-all duration-200"
            >
              编辑
            </router-link>
            <button 
              @click="del(article._id)" 
              class="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-700 bg-red-50 rounded-md text-sm font-medium hover:bg-red-100 transition-all duration-200"
            >
              删除
            </button>
        </td>
        </tr>
      </tbody>
    </table>

    <p v-if="error" class="text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])
const error = ref('')

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/articles')
  articles.value = await res.json()
})

async function del(id) {
  if (!confirm('确认删除这篇文章？')) return

  const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    articles.value = articles.value.filter(a => a._id !== id)
  } else {
    error.value = '删除失败'
  }
}
</script>
