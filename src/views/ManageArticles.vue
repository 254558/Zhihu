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
            <router-link :to="`/edit/${article._id}`" class="text-blue-600 hover:underline">编辑</router-link>
            <button @click="del(article._id)" class="text-red-600 hover:underline">删除</button>
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