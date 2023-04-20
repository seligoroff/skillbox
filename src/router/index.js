import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import NotFoundPage from '@/pages/NotFoundPage'
import CartPage from '@/pages/CartPage'
import OrderPage from '@/pages/OrderPage'
import OrderCompletePage from '@/pages/OrderCompletePage'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'main', component: MainPage},
  { path: '/product/:id', name: 'product', component: ProductPage },
  { path: '/cart', name: 'cart', component: CartPage},
  { path: '/order', name: 'order', component: OrderPage},
  { path: '/complete/:orderId', name: 'complete', component: OrderCompletePage},
  { path: '*', name: 'notFound', component: NotFoundPage },

]

const router = new VueRouter({
  routes
})

export default router
