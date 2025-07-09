import { createRouter, createWebHistory } from 'vue-router'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ArticleList },
    { path: '/article/:name', component: ArticleDetail, props: true }
  ]
})