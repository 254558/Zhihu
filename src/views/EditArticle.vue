<template>
  <div class="max-w-5xl mx-auto p-6 space-y-4"> <!-- 将 max-w-3xl 改为 max-w-5xl 增加宽度 -->
    <button @click="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">保存修改</button>

    <input v-model="form.title" type="text" class="w-full border p-3 rounded-lg text-lg" placeholder="标题" />

    <textarea v-model="form.content" rows="16" class="w-full border p-3 rounded-lg text-lg leading-relaxed" placeholder="Markdown 正文"></textarea>



    <p v-if="success" class="text-green-600">✅ 修改成功！</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'

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