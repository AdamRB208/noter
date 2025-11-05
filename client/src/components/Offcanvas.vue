<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { notebookService } from '@/services/NotebookService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const account = computed(() => AppState.account)
const notebooks = computed(() => AppState.notebooks)
const route = useRoute()


async function getNotebooks() {
  try {
    await accountService.getAccount()
    notebookService.getNotebooks()
  }
  catch (error) {
    Pop.error(error, 'COULD NOT GET NOTEBOOKS!');
    logger.log('Could not get notebooks!', error)
  }
}

async function getNotebookById(notebookId) {
  try {
    logger.log('Notebook Id', notebookId)
    await notebookService.getNotebookById(notebookId)
    logger.log(notebooks)
  }
  catch (error) {
    Pop.error(error);
    logger.log('Could not get Active Notebook!', error)
  }
}

</script>


<template>
  <div class="m-5">
    <button @click="getNotebooks()" class="btn btn-primary btn-rounded text-light" type="button"
      data-bs-toggle="offcanvas" data-bs-target="#manageNotebooks" aria-controls="manageNotebooks">Notebooks</button>
  </div>
  <div>
    <div class="offcanvas offcanvas-start text-light" tabindex="-1" id="manageNotebooks"
      aria-labelledby="manageNotebooks">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="manageNotebooks">Manage Notebooks</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-flex d-inline">
          <div class="mb-3">
            <label for="title" class="form-label">Notebook Title</label>
            <input type="text" class="form-control w-100" placeholder="Title" aria-label="title">
          </div>
          <div class="mb-3 ms-1">
            <label for="icon" class="form-label">Icon</label>
            <input type="text" class="form-control w-100" placeholder="Icon" aria-label="icon">
          </div>
          <div class="mb-3 ms-1">
            <label for="color" class="form-label">Color</label>
            <input type="color" class="form-control form-control-color w-100" id="color" value="#563d7c"
              title="Choose your color">
          </div>
        </div>
        <div class="mb-4">
          <label for="url" class="form-label">Cover Image</label>
          <input type="url" class="form-control" placeholder="Image URL..." aria-label="url">
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary text-light" type="button">
            Create Notebook
          </button>
        </div>
      </div>
      <div v-if="account" class="offcanvas-footer overflow-auto">
        <!-- TODO create simple layout for notebook data as a button so active notebook can be rendered on home page when selected -->
        <div v-for="notebook in notebooks" :key="notebook.id">
          <span @click="getNotebookById(notebook.id)"
            class="d-flex d-inline justify-content-between m-2 notebook-btn rounded p-2" type="button"
            :style="{ borderColor: notebook.color }">
            <i :class="`mdi ${notebook.icon}`"></i>
            <div>{{ notebook.title }}</div>
            <div>{{ notebook.entryCount }} Entries</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.offcanvas-start {
  background-color: rgba(72, 71, 71, 0.831);
}
.offcanvas-body {
  height: 100%;
  overflow: initial;
}

.notebook-btn {
  max-width: 100vw;
  border: 2px solid;
}

</style>