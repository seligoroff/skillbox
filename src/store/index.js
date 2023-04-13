import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/data/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      cartProducts: [          
      ]
  },
  mutations: {
      addProductToCart(state, {productId, amount}) {
          const item = state.cartProducts.find(item => item.productId == productId)
          if (item) {
            item.amount += amount
          } else {
            state.cartProducts.push({
                productId,
                amount
            });
          }
      }, 
      updateCartAmount(state, {productId, amount}) {
          const item = state.cartProducts.find(item => item.productId == productId)
          if (item) {
            item.amount = amount
          } 
      },
      removeElement(state, productId) {
          state.cartProducts = state.cartProducts.filter(item => item.productId != productId) 
      }
  },
  actions: {
  },
  modules: {
  },
  getters: {
      cartProductDetails(state) {
          return state.cartProducts.map(item => {
                return {
                    ...item,
                    product: products.find(p => p.id === item.productId)
                }                      
          }); 
      },
      cartTotalPrice(state, getters) {
          return getters.cartProductDetails.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
      },
      cartAmount(state, getters) {
           return getters.cartProductDetails.length;
      }
  }
})
