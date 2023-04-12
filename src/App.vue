<template>
    <component :is="currentPageComponent" :page-params="currentPageParams"  />
</template>

<script>
import MainPage from '@/pages/MainPage'
import ProductPage from '@/pages/ProductPage'
import NotFoundPage from '@/pages/NotFoundPage'
import eventBus from '@/eventBus.js'


const routes = {
    main: 'MainPage',
    product: 'ProductPage'
}

export default {
    data() {
        return {
            currentPage: 'main',
            currentPageParams: {
                
            } 
        }
    },
    methods: {
        route (pageName, pageParams) {
            this.currentPage = pageName;
            this.currentPageParams = pageParams || {};
        }
    },
    computed: {
        currentPageComponent() {
            return routes[this.currentPage] || 'NotFoundPage'
        }
    },
    components: {
        MainPage,
        ProductPage,
        NotFoundPage
    },
    created() {
        eventBus.$on('route', (pageName, pageParams) => this.route(pageName, pageParams));
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
