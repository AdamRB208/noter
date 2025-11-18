<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const entry = computed(() => AppState.entries)

</script>


<template>
  <div v-for="entry in entry" :key="entry.id" class="col-md-8 entry-container">
    <div class="d-flex">
      <img :src="`${entry.img}`" alt="Image included in entry">
      <div class="ms-4">
        <p>{{ entry.description }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  width: 50%;
  height: 50%;
}

.entry-container {
  border: 4px;
  border-color: black;

}
</style>