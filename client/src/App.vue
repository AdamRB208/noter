<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView/>
  </main>
  <footer class=" text-center">
    Made with <i class="mdi mdi-heart text-pink"></i> by CodeWorks
  </footer>
</template>

<style lang="scss">

main {
  background-image: url(https://plus.unsplash.com/premium_photo-1726244024984-df9cce583191?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjBiYWNrZ3JvdW5kfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500);
  width: 100%;
  height: 100%;
}

</style>
