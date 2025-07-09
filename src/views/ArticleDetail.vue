<template>
  <div class="flex justify-center px-4 py-8">
    <div class="w-full max-w-screen-lg bg-white rounded-xl shadow p-6 md:p-10">
      <router-link
        to="/"
        class="inline-block mb-6 text-blue-600 hover:underline text-base"
      >
        ← Back to Articles
      </router-link>

      <article
        v-html="html"
        class="prose prose-slate text-xl leading-relaxed max-w-none"
      ></article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const html = ref('Loading...')

onMounted(async () => {
  const res = await fetch(`/articles/${route.params.name}`)
  html.value = marked(await res.text())
})
</script>