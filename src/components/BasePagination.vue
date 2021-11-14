<template>
    <ul class="catalog__pagination pagination" v-show="pages > 0">
         <li class="pagination__item" >
            <a class="pagination__link pagination__link--arrow" aria-label="Предыдущая страница" @click.prevent="decrement" :class="{'pagination__link--disabled' : page == 1}">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
            <a class="pagination__link" :class="{'pagination__link--current': pageNumber == page}" @click.prevent="changePage(pageNumber)">
              {{ pageNumber }}
            </a>
          </li>         
          <li class="pagination__item" >
              <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" @click.prevent="increment" :class="{'pagination__link--disabled' : page >= pages}">
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
</template>

<script>
    export default {
        model: {
            prop: 'page',
            event: 'choose-page'
        },    
        props: ['page', 'count', 'perPage'],
        computed: {
            pages() {
                return Math.ceil(this.count / this.perPage);
            },
            incrementable() {
                return this.page >= this.pages
            },
            decrementable () {
                return this.page == 1;
            }
        },
        methods: {
            changePage(newpage) {                        
                this.$emit('choose-page',  newpage);                
            },
            increment() {
                if (this.incrementable) {
                    return;
                }                
                this.$emit('choose-page', this.page + 1);                                
            },
            decrement () {
                if (this.decrementable) {
                    return;
                } 
                this.$emit('choose-page', this.page - 1);                                                
            }
        }
        
    }
    
</script>    

<style>
    .catalog__pagination  { margin-top: 40px;}
</style> 