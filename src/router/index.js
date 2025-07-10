import { createRouter, createWebHistory } from 'vue-router'
import ArticleList from '../views/ArticleList.vue'
import ArticleDetail from '../views/ArticleDetail.vue'
import UploadArticle from '../views/UploadArticle.vue'
import ManageArticles from '../views/ManageArticles.vue'
import EditArticle from '../views/EditArticle.vue'

const routes = [
  { path: '/', component: ArticleList },
  { path: '/article/:id', component: ArticleDetail }, 
  { path: '/upload', component: UploadArticle }, 
  { path: '/manage', component: ManageArticles },
  { path: '/edit/:id', component: EditArticle }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})