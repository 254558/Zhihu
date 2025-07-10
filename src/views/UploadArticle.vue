<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">

      <!-- 标题输入 -->
      <input
        v-model="form.title"
        type="text"
        placeholder="请输入文章标题"
        class="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <!-- 富文本编辑器 -->
      <div class="rounded-lg overflow-hidden border border-gray-300">
        <QuillEditor
          v-model:content="form.content"
          contentType="html"
          class="min-h-[300px] bg-white"
        />
      </div>

      <!-- 发布按钮 -->
      <div class="text-right">
        <button
          @click="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-medium"
        >
          发布文章
        </button>
      </div>

      <!-- 状态提示 -->
      <p v-if="success" class="text-green-600 font-medium">✅ 发布成功！</p>
      <p v-if="error" class="text-red-600 font-medium">❌ {{ error }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const form = ref({
  title: '',
  content: '',
})

const success = ref(false)
const error = ref('')

async function submit() {
  success.value = false
  error.value = ''

  const res = await fetch('http://localhost:3000/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  })

  if (res.ok) {
    success.value = true
    form.value = { title: '', content: '' }
  } else {
    const data = await res.json()
    error.value = data.error || '发布失败'
  }
}
</script>