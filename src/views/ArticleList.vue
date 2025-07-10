<template>
  <div class="max-w-5xl mx-auto p-4 sm:p-6">
      <div 
        v-for="article in articles" 
        :key="article._id"
        class="bg-white rounded-xl p-1 hover:bg-gray-50 transition-colors duration-200 mb-0"
      >
        <router-link
          :to="`/article/${article._id}`"
          class="block group"
        >
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary group-hover:scale-105 transition-all duration-300 leading-tight mb-3 inline-block"
              style="transition-delay: 0ms;">
            {{ article.title }}
          </h3>
        </router-link>
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

<style scoped>
:root {
--primary: #4F46E5;
}
.group:hover .group-hover:scale-105 {
transform: scale(1.05);
transition-delay: 0 !important;
}
.bg-white {
transition: background-color 0.2s ease;
}
</style>