<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Article List</h1>
    <ul class="space-y-2">
      <li v-for="article in articles" :key="article">
        <router-link :to="`/article/${article}`" class="text-blue-600 underline">
          {{ article }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const articles = ref(['hello.md', 'about.md'])
</script>