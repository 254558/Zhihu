<template>
  <div class="flex justify-center px-4 py-8"> 
    <div class="w-full max-w-4xl">
      <ul class="grid gap-4">
        <li v-for="article in articles" :key="article">
          <router-link
            :to="`/article/${article}`"
            class="block p-4 rounded-xl bg-white shadow hover:shadow-md transition"
          >
            <h2 class="text-lg font-semibold">{{ formatTitle(article) }}</h2>
            <p class="text-sm text-gray-500">Click to read more</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const articles = ref(['hello.md', 'about.md'])

const formatTitle = (name) =>
  name.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
</script>