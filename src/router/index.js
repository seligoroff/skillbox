import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main', component: MainPage},
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '*', name: 'notFound', component: NotFoundPage },

]

const router = new VueRouter({
  routes
})

export default router
