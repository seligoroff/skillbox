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
           <ProductList :products="products" />
           <BasePagination v-model.sync="page" :per-page="productsPerPage" :count="countProducts"/>  
      </section>

    </div>
  </main>
    
</template>

<script>
import products from './data/products'
import ProductList from './components/ProductList'
import ProductsFilter from './components/ProductsFilter'
import BasePagination from './components/BasePagination'


export default {
    name: 'App',
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
            productsPerPage: 3            
        }
    },
    computed:  {
        filteredProducts() {
            let filteredProducts = products

            if (this.filteredPriceFrom > 0) {
                filteredProducts = filteredProducts.filter( product => product.price >=  this.filteredPriceFrom)
            }
            
            if (this.filteredPriceTo > 0) {
                filteredProducts = filteredProducts.filter( product => product.price <=  this.filteredPriceTo)
            }
            
            if (this.filteredCategoryId > 0) {
                filteredProducts = filteredProducts.filter( product => product.categoryId ==  this.filteredCategoryId)
            }
            
            if (this.filteredColor) {
                filteredProducts = filteredProducts.filter( product => product.color ==  this.filteredColor)
            }
            
            this.page = 1 
            return filteredProducts
        },
        products () {
            const offset = (this.page - 1) * this.productsPerPage;
            return this.filteredProducts.slice(offset, offset + this.productsPerPage);
        },
        countProducts() {
            return this.filteredProducts.length
        }
    }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
