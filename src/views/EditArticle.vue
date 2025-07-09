<template>
  <div class="max-w-3xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">编辑文章</h1>

    <input v-model="form.title" type="text" class="w-full border p-2 rounded" placeholder="标题" />
    <input v-model="form.summary" type="text" class="w-full border p-2 rounded" placeholder="摘要" />
    <input v-model="form.slug" type="text" class="w-full border p-2 rounded" disabled />

    <textarea v-model="form.content" rows="10" class="w-full border p-2 rounded" placeholder="Markdown 正文"></textarea>

    <button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">保存修改</button>

    <p v-if="success" class="text-green-600">✅ 修改成功！</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'

// 这些只能写在顶层，不能写在函数里！

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: '',
  content: '',
})

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`)
  const data = await res.json()
  form.value = data
})

async function submit() {
  await fetch(`http://localhost:3000/api/articles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })
  router.push('/')
}
</script>