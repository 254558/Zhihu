<template>
  <div class="p-6">
    <router-link to="/" class="text-blue-600 underline">← Back to List</router-link>
    <div v-html="html" class="prose mt-6"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'

const route = useRoute()
const html = ref('Loading...')

onMounted(async () => {
  const res = await fetch(`/articles/${route.params.name}`)
  const md = await res.text()
  html.value = marked(md)
})
</script>

<style>
.prose {
  max-width: 65ch;
  line-height: 1.6;
}
</style>