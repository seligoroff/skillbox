<template>
   
</template>

<script>
    export default {        
        data() { 
            return {
                color:  '#73B6EA'
            }
        },    
        methods: {
            chooseColor(newColor) {
                this.color = newColor;
            }
        },
        computed: {
            currentColor() {
                return this.color
            }
        } 
    }    
</script>    