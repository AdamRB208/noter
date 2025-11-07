<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { notebookService } from '@/services/NotebookService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)
const notebooks = computed(() => AppState.notebooks)

const icon = ['mdi-database', 'mdi-cloud', 'mdi-package', 'mdi-palette', 'mdi-home', 'mdi-code-array', 'mdi-xml', 'mdi-cash', 'mdi-food-apple', 'mdi-account', 'mdi-shield', 'mdi-pencil']

const editableNotebookData = ref({
  title: '',
  icon: '',
  coverImg: '',
  color: '',
})

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

async function createNotebook() {
  try {
    const notebook = await notebookService.createNotebook(editableNotebookData.value)
    editableNotebookData.value = {
      title: '',
      icon: '',
      coverImg: '',
      color: '',
    }

  }
  catch (error) {
    Pop.error(error);
    logger.log('Could not create Notebook!', error)
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
        <form @submit.prevent="createNotebook()">
          <div class="d-flex d-inline">
            <div class="mb-3">
              <label for="title">Notebook Title</label>
              <input v-model="editableNotebookData.title" id="title" name="title" type="text" class="form-control w-100"
                placeholder="Title" aria-label="title" maxlength="25" required>
            </div>
            <!-- TODO make icon section a dropdown where the icon can be selected -->
            <div class="mb-3 ms-1">
              <label for="icon" class="form-label mb-0">Icon</label>
              <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <i v-if="editableNotebookData.icon" :class="`mdi ${editableNotebookData.icon}`"></i>
                  {{ editableNotebookData.icon ? editableNotebookData.icon.replace('mdi-', '') : 'Choose icon...' }}
                </button>
                <ul class="dropdown-menu w-100">
                  <li v-for="iconName in icon" :key="iconName">
                    <button class="dropdown-item" type="button" @click="editableNotebookData.icon = iconName">
                      <i :class="`mdi ${iconName}`"></i> {{ iconName.replace('mdi-', '') }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mb-3 ms-1">
              <label for="color">Color</label>
              <input v-model="editableNotebookData.color" id="color" name="color" type="color"
                class="form-control form-control-color w-100" value="#563d7c" title="Choose your color" maxlength="20"
                required>
            </div>
          </div>
          <div class="mb-4">
            <label for="coverImg">Cover Image</label>
            <input v-model="editableNotebookData.coverImg" id="coverImg" name="coverImg" type="url" class="form-control"
              placeholder="Image URL..." aria-label="url" maxlength="500" required>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary text-light" type="submit">
              Create Notebook
            </button>
          </div>
        </form>
      </div>
      <div v-if="account" class="offcanvas-footer overflow-auto">
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