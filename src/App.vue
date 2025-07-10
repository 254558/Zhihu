<template>
  <!-- 导航栏 -->
  <nav class="bg-white shadow-md py-4 px-6 flex justify-center transition-all duration-300">
    <div class="flex space-x-2 md:space-x-4">
      <router-link
        to="/"
        class="px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
        active-class="bg-blue-50 text-blue-600 font-semibold"
        exact
      >
        首页
      </router-link>
      <router-link
        to="/upload"
        class="px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
        active-class="bg-blue-50 text-blue-600 font-semibold"
      >
        发布文章
      </router-link>
    </div>
  </nav>

  <main class="flex-1 w-full mx-auto p-6">
    <router-view />
  </main>
</template>