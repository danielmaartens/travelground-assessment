<template>
    <div id="app">


        <Card/>
    </div>
</template>

<script>
    import Card from './components/Card.vue'

    export default {
        name: 'app',
        components: {
            Card,
        }
    }
</script>

<style lang="scss">

    html {
        scroll-behavior: smooth;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    a {
        text-decoration: none;
        color: inherit;

    }

</style>
