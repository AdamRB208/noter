<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const entry = computed(() => AppState.entries)

</script>


<template>
  <div v-for="entry in entry" :key="entry.id" class="entry-container">
    <div class="d-flex">
      <img :src="`${entry.img}`" alt="Image included in entry">
      <div class="p-2">
        <p>{{ entry.description }}</p>
      </div>
    </div>
    <div class="d-flex justify-content-end m-2">
      <button class="btn btn-outline-dark"><i class="mdi mdi-dots-horizontal"></i></button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  width: 15rem;
    height: auto;
  }
  
  .entry-container {
    border: 2px solid black;
  }
                                                                                                                                p {
                                                                                                                                  font-size: .75rem;
                                                                                                                                  padding: 1em;
                                                                                                                                  margin: 0;
                                                                                                                                  background-color: antiquewhite;
                                                                                                                                }
</style>