<template>
     <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartAmount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
  
            
        <base-form-text title="ФИО" :error="formError.name" v-model="formData.name" placeholder="Введите ваше полное имя"></base-form-text>  
              
        <base-form-text title="Адрес доставки" :error="formError.name" v-model="formData.address" placeholder="Введите ваш адрес"></base-form-text>   
           
        <base-form-text title="Телефон" :error="formError.phone" type="tel" v-model="formData.phone" placeholder="Введите ваш телефон"></base-form-text>   

        <base-form-text title="Email" :error="formError.email" type="email" v-model="formData.email" placeholder="Введи ваш Email"></base-form-text>   
            
        <base-form-textarea title="Комментарий к заказу" v-model="formData.comment" :error="formError.comment" placeholder="Ваши пожелания">                
        </base-form-textarea>     
              
              
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in items" :key="item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price * item.amount | numberFormat}} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>           
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>{{ deliveryPrice }} ₽</b></p>
            <p>Итого: <b>{{ cartAmount }}</b> товара на сумму <b>{{ orderPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" v-if="!sendingData">
            Оформить заказ
          </button>
          <div v-if="sendingData" >Отправляем заказ... <img src="/img/1496.gif" style="padding:0 40px" /></div>  
            
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
    import BaseFormField from '@/components/BaseFormField';
    import BaseFormText from '@/components/BaseFormText';
    import BaseFormTextarea from '@/components/BaseFormTextarea';
    import  numberFormat from '@/helpers/numberFormat'
    import { mapGetters } from 'vuex'
    import CartItem from '@/components/CartItem'
    import axios from 'axios'
    import {API_BASE_URL, DEFAULT_API_TIMEOUT_LIMIT} from '@/config'
    
    export default {
        data() {
            return {
                formData: {
               
                }, 
                formError: {
                    
                },
                formErrorMessage: '',
                deliveryPrice: 500,
                sendingData: false
            }
        }, 
        filters: {
            numberFormat
        },
        components: {
            BaseFormField,
            BaseFormText,
            BaseFormTextarea
        },
        computed: {
            ...mapGetters({ items: 'cartProductDetails', fullPrice: 'cartTotalPrice', cartAmount: 'cartAmount'}),
            orderPrice() {
                var initialValue = this.deliveryPrice;                    
                return  this.items.reduce((initialValue, item) => item.product.price * item.amount  + initialValue, initialValue);                                              
            }
        },
        methods: {           
            order() {
                this.formError  = {};
                this.formErrorMessage = '';
                this.sendingData = true;
                
                setTimeout(() => axios.post(API_BASE_URL + '/api/orders', {
                    ...this.formData
                }, {
                    params: {
                        userAccessKey: this.$store.state.userAccessKey
                    }
                }).then(response => {
                    this.sendingData = false;
                    this.$store.commit('resetCart');
                    this.formData = [];
                    this.$store.commit('updateOrderInfo', response.data)
                    this.$router.push({ name: 'complete', params: { orderId: response.data.id }});
                })
                .catch(error => {                    
                    this.sendingData = false;                    
                    this.formError = error.response.data.error.request || {};
                    this.formErrorMessage = error.response.data.error.message || '';
                }), DEFAULT_API_TIMEOUT_LIMIT);    
            }
        }
    } 
</script>