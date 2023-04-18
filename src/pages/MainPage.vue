<template> 
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
        
      <ProductsFilter :color.sync="filteredColor" :page.sync="page" :price-from.sync="filteredPriceFrom" :price-to.sync="filteredPriceTo" :category-id.sync="filteredCategoryId" />        
      <section class="catalog">         
          <div v-show="productsLoading">Загрузка товаров... </div> 
          <div v-show="productsLoadingFailed">Ошибка загрузки товаров... <button @click.prevent="loadProducts">Попробовать еще раз</button></div> 
           <ProductList :products="products"  />
           <BasePagination v-model.sync="page" :per-page="productsPerPage" :count="countProducts"/>  
      </section>

    </div>
  </main>
    
</template>
<script>
import products from '@/data/products'
import ProductList from '@/components/ProductList'
import ProductsFilter from '@/components/ProductsFilter'
import BasePagination from '@/components/BasePagination'
import axios from 'axios'
import {API_BASE_URL, DEFAULT_API_TIMEOUT_LIMIT} from '@/config'

export default {    
    components: {
        ProductList,
        BasePagination,
        ProductsFilter
    },
    data() {
        return {
            filteredPriceFrom: '',
            filteredPriceTo: '',
            filteredCategoryId: 0,
            filteredColor: '',
            page: 1,
            productsPerPage: 3,
            productsData: null,
            productsLoading: false,
            productsLoadingFailed: false
        }
    },
    computed:  {      
        products () {            
            return this.productsData ? this.productsData.items.map( product => {
                return {
                    ...product,
                    image: product.image.file.url
                } 
            }) : [];
        }, 
        countProducts() {
            return this.productsData ? this.productsData.pagination.total :  0;
        }
    },
    methods: {
        loadProducts() {
        this.productsLoading = true;    
        this.productsLoadingFailed = false;
        clearTimeout(this.loadProductsTimer);    
        this.loadProductsTimer = setTimeout(() => {axios.get(API_BASE_URL + '/api/products', {
                params: {
                    page: this.page,
                    limit: this.productsPerPage,
                    categoryId: this.filteredCategoryId,
                    minPrice: this.filteredPriceFrom,
                    maxPrice: this.filteredPriceTo,
                    colorId: this.filteredColor
                }
            })
                .then(response => this.productsData = response.data)                
                .catch(() => this.productsLoadingFailed = true)
                .then(() => this.productsLoading = false);
            },DEFAULT_API_TIMEOUT_LIMIT);
        }
    },
    watch: {
        page() {
            this.loadProducts();
        },
        filteredPriceFrom () {            
            this.loadProducts();
        },
        filteredPriceTo() {            
            this.loadProducts();
        },
        filteredCategoryId() {            
            this.loadProducts();
        },
        filteredColor() {            
            this.loadProducts();
        }
    },
    created() {
        this.loadProducts();
    }
}        
</script>
