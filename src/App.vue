<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <header class="bg-white shadow p-4 text-xl font-bold text-center">
      我的知乎收藏
    </header>
    <!-- 移除 max-w-3xl 类名 -->
    <main class="flex-1 w-full mx-auto p-6"> 
      <router-view />
    </main>
  </div>
</template>