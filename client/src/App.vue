<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
     <aalinks-nav></aalinks-nav>
    <router-view/>
  </div>
</template>

<script>

<<<<<<< HEAD
import Navigate from '@/components/navigation'

=======
>>>>>>> 573250f1b5048d92c848a02f3b24dc105c5a3ab3
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
