<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <div v-for="article in articles" :key="article.slug" class="border-b pb-4">
      <router-link
        :to="`/article/${article._id}`"
        class="text-black text-2xl font-semibold hover:no-underline"
      >
        {{ article.title }}
      </router-link>
      <p class="text-gray-600 text-sm">{{ article.summary }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchArticles } from '../api'

const articles = ref([])

onMounted(async () => {
  articles.value = await fetchArticles()
})


</script>