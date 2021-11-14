<template>        
      <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model="currentCategoryId">
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
<!--
          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16 
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264 
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>
-->
          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click="drop">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
    import categories from '../data/categories'
    import colors from '../data/colors'
    
    export default {
          props:['page', 'priceFrom', 'priceTo', 'categoryId', 'color'],  
          methods: {
            drop() {
                this.currentColor = '';
                this.currentPriceFrom = '';
                this.currentPriceTo = '';
                this.currentCategoryId = 0;
                this.currentPage = 1;
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
              currentColor: {
                    get() {
                        return this.color
                    },
                    set(value) {
                        this.$emit('update:color', value)
                    }
              },
              currentPriceFrom: {
                  get() {
                      return this.priceFrom
                  },
                  set(value) {                      
                      this.$emit('update:priceFrom', value)
                  }
              },
              currentPriceTo: {
                  get() {
                      return this.priceTo
                  },
                  set(value) {                      
                      this.$emit('update:priceTo', value)
                  }
              },
              currentCategoryId: {
                  get() {
                      return this.categoryId
                  },
                  set(value) {                     
                      this.$emit('update:categoryId', value)
                  }
              },
              categories() {
                  return categories
              },
              colors() {
                  return colors
              }
          }  
    }
</script>