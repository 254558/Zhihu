// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 扫描这些文件找 class 名
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}