<template>
    <li class="catalog__item"   >
    
    <router-link class="catalog__pic" :to="{ name: 'product', params: {id: product.id }}">
           <img :src="product.image"  :alt="product.title">
     </router-link>

         <h3 class="catalog__title">
           <a href="#">
             {{  product.title }}
           </a>
         </h3>

         <span class="catalog__price">
           {{ product.price | numberFormat }} ₽
         </span>
        
        <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio"  :value="color"  v-model="currentColor">
            <span class="colors__value" :style="'background-color: ' + color" >
            </span>
          </label>
        </li>        
      </ul> 
         
    </li>    
</template>
    
<script>    
import eventBus from '@/eventBus'   
import route from '@/helpers/route'
import numberFormat from '@/helpers/numberFormat'

export default {    
         data() {
           return {
              currentColor : '' 
           }  
         }, 
         props: ['product'],   
         methods: {
            route
         },
        filters:  {
            numberFormat
        }
    }
</script>