<template>        
      <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

            <fieldset class="form__block" v-if="categories.length > 0">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
                <option value="0">Все категории</option>
                <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.title }}</option>                
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="colorItem in colors">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"  :value="colorItem" v-model="currentColor">
                  <span class="colors__value" :style="'background-color:' + colorItem">
                  </span>
                </label>
              </li>
            
            </ul>
          </fieldset>
          <button class="filter__submit button button--primery" type="submit" >
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="reset">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
    import categories from '../data/categories'
    import colors from '../data/colors'
    import axios from 'axios'
    import {API_BASE_URL} from '@/config'
    
    export default {
          props:['page', 'priceFrom', 'priceTo', 'categoryId', 'color'],  
          data() {
              return {
                  currentColor: '',
                  currentPriceFrom: 0,
                  currentPriceTo: 0,
                  currentCategoryId: 0,
                  categoriesData: null
              }
          },
          methods: {
            reset() {
                this.$emit('update:color', '');
                this.$emit('update:priceFrom', 0);
                this.$emit('update:priceTo', 0);
                this.$emit('update:categoryId', 0);                
            },
            submit() {
                this.$emit('update:color', this.currentColor);
                this.$emit('update:priceFrom', this.currentPriceFrom);
                this.$emit('update:priceTo', this.currentPriceTo);
                this.$emit('update:categoryId', this.currentCategoryId);                
            },
            loadCategories() {
                axios.get(API_BASE_URL + '/api/productCategories').
                  then(response => this.categoriesData = response.data);
            }
          },
          watch: {
              priceFrom(value) {
                  this.currentPriceFrom = value;
              },
              priceTo(value) {
                  this.currentPriceTo = value;
              },
              categoryId(value) {
                  this.currentCategoryId = value;                  
              },
              color(value) {
                  this.currentColor = value;
              }
          },
          computed: {
              currentPage: {
                  get() {
                      return this.page
                  },
                  set(value) {
                      this.$emit('update:page', value)
                  }
              },
              categories() { 
                  return this.categoriesData ? this.categoriesData.items : []; 
              },
              colors() {
                  return colors
              }
          },
          created() {
              this.loadCategories();
          }
    }
</script>