import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_BASE_URL} from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      cartProducts: [          
      ],
      userAccessKey: null,
      cartProductsData: []
  },
  mutations: {
      updateCartAmount(state, {productId, amount}) {
          const item = state.cartProducts.find(item => item.productId == productId)
          if (item) {
            item.amount = amount
          } 
      },
      removeElement(state, productId) {
          state.cartProducts = state.cartProducts.filter(item => item.productId != productId) 
      },
      updateUserAccessKey(state, accessKey){
          state.userAccessKey = accessKey
      },
      updateCartProductData(state, items) {
          state.cartProductsData = items
      },
      syncCartProducts(state) {
          state.cartProducts = state.cartProductsData.map(item => {
              return {
                  productId: item.product.id,
                  amount: item.quantity
              }
          })
      }
  },
  actions: {
       loadCart(context) {
            axios
                .get(API_BASE_URL + '/api/baskets', {
                    params: {
                        userAccessKey: context.state.userAccessKey
                    }
                })
                .then(response => {
                    if (!context.state.userAccessKey) {
                        localStorage.setItem('userAccessKey', response.data.user.accessKey);
                        context.commit('updateUserAccessKey', response.data.user.accessKey);
                    }
                    
                    context.commit('updateCartProductData', response.data.items);
                    context.commit('syncCartProducts');
                })                        
      },
      addProductToCart(context, {productId, amount}) {
          return axios.post(API_BASE_URL + '/api/baskets/products', {
              productId: productId,
              quantity: amount
          }, {
              params: {
                  userAccessKey: context.state.userAccessKey
              }
          })
        .then(response => {
            context.commit('updateCartProductData', response.data.items);
            context.commit('syncCartProducts');
        })
      },
      updateCartProductAmount(context, {productId, amount}) {
        context.commit('updateCartAmount', {productId, amount});
        
        if (amount < 1) {
            return;
        }
        return axios.put(API_BASE_URL + '/api/baskets/products', {
              productId: productId,
              quantity: amount
          }, {
              params: {
                  userAccessKey: context.state.userAccessKey
              }
          })
        .then(response => {
            context.commit('updateCartProductData', response.data.items);            
        })
        .catch(() => {
            context.commit('syncCartProducts');
        })
      }, 
      removeCartProduct(context, productId) {
          
        console.log(context.state.userAccessKey);
        
        return axios.delete(API_BASE_URL + '/api/baskets/products',  {
              params: {
                  userAccessKey: context.state.userAccessKey
              },
              data: {
                productId: productId            
              }
          })
          .then(response => {
            context.commit('updateCartProductData', response.data.items);
            context.commit('syncCartProducts');
          }).catch( error => console.log(error.message))
      }
      
  },
  modules: {
  },
  getters: {
      cartProductDetails(state) {
          return state.cartProducts.map(item => {
                const product = state.cartProductsData.find(p => p.product.id === item.productId ).product; 
                return {
                    ...item,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
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
