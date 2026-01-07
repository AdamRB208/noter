<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const entries = computed(() => AppState.entries)
const emit = defineEmits(['edit'])

</script>


<template>
  <div v-for="entry in entries" :key="entry.id" class="entry-container">
    <div class="d-flex">
      <div class="p-2">
        <img :src="`${entry.img}`" alt="Image included in entry">
      </div>
      <div class="p-2 description-container">
        <p>{{ entry.description }}</p>
      </div>
    </div>
    <div class="d-flex justify-content-end m-2">
      <button @click="() => emit('edit', entry)" class="btn btn-outline-dark" type="button"><i
          class="mdi mdi-dots-horizontal"></i></button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  width: 15rem;
  min-height: 100%;
}

.entry-container {
  border: 2px solid black;
  margin-bottom: .5rem;
}

p {
  font-size: .75rem;
  padding: 1em;
  margin: 0;
  background-color: antiquewhite;
  min-height: 100%;
  min-width: 100%;
}

.description-container {
  width: 100%;
}
</style>