<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <header class="bg-white shadow p-4 text-xl font-bold text-center">
      📝 Markdown Blog
    </header>
    <main class="flex-1 max-w-3xl w-full mx-auto p-6">
      <router-view />
    </main>
    <footer class="text-center text-sm p-4 text-gray-500">
      © 2025 Markdown Site
    </footer>
  </div>
</template>