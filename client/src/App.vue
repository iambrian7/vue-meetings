<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
     <aalinks-nav></aalinks-nav>
    <router-view/>
  </div>
</template>

<script>

import Navigate from '@/components/navigation'

export default {
  name: 'App',
  components: {
    "aalinks-nav": Navigate
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
