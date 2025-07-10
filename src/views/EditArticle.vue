<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">

      <!-- 页面标题 -->
      <h2 class="text-2xl font-bold text-gray-800">✏️ 编辑文章</h2>

      <!-- 标题输入 -->
      <input
        v-model="form.title"
        type="text"
        class="w-full border border-gray-300 p-4 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
        placeholder="请输入文章标题"
      />

      <!-- 富文本编辑器 -->
      <div class="rounded-lg overflow-hidden border border-gray-300">
<QuillEditor
  v-model:content="form.content"
  content-type="html"
  class="ql-editor custom-quill bg-white rounded shadow"
  :style="{ minHeight: '300px' }"
/>
      </div>

      <!-- 提交按钮 -->
      <div class="text-right">
        <button
          @click="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-base font-medium"
        >
          保存修改
        </button>
      </div>

      <!-- 状态提示 -->
      <p v-if="success" class="text-green-600 font-medium">✅ 修改成功！</p>
      <p v-if="error" class="text-red-600 font-medium">❌ {{ error }}</p>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const form = ref({
  title: '',
  content: '',
})

const success = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`)
    const data = await res.json()

    form.value.title = data.title || ''
    form.value.content = data.content || ''
  } catch (err) {
    error.value = '加载失败'
  }
})

async function submit() {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error('保存失败')

    success.value = true
    error.value = ''
    // router.push(`/article/${id}`) // 可选跳转
  } catch (err) {
    error.value = err.message || '保存失败'
  }
}
</script>