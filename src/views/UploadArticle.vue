<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">发布新文章</h1>

    <!-- 标题输入 -->
    <input
      v-model="form.title"
      type="text"
      placeholder="请输入文章标题"
      class="w-full border p-2 rounded"
    />

    <!-- 正文编辑 + Markdown 实时预览 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Markdown 输入 -->
      <textarea
        v-model="form.content"
        rows="20"
        placeholder="请输入 Markdown 正文内容"
        class="w-full border p-2 rounded"
      ></textarea>

      <!-- 实时预览 -->
      <div
        class="prose prose-lg max-w-none border p-4 rounded bg-white shadow overflow-auto"
        v-html="htmlPreview"
      ></div>
    </div>

    <!-- 提交按钮 -->
    <button
      @click="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      发布文章
    </button>

    <!-- 状态提示 -->
    <p v-if="success" class="text-green-600">✅ 发布成功！</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'

const form = ref({
  title: '',
  content: '',
})

const htmlPreview = ref('')
const success = ref(false)
const error = ref('')

// 实时渲染 Markdown
watch(
  () => form.value.content,
  (newVal) => {
    htmlPreview.value = marked.parse(newVal || '')
  },
  { immediate: true }
)

// 发布文章
async function submit() {
  success.value = false
  error.value = ''

  const res = await fetch('http://localhost:3000/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: form.value.title,
      content: form.value.content,
      date: new Date(),
    }),
  })

  if (res.ok) {
    success.value = true
    form.value = { title: '', content: '' }
    htmlPreview.value = ''
  } else {
    const data = await res.json()
    error.value = data.error || '发布失败'
  }
}
</script>