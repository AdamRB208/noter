<script setup>
import { AppState } from '@/AppState.js';
import { entrysService } from '@/services/EntrysService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';



const formData = ref({
  description: '',
  img: '',
})

function resetForm() {
  formData.value = {
    description: '',
    img: '',
    notebookId: '',
  }
}

async function createEntry() {
  try {
    await entrysService.createEntry(formData.value)
    resetForm()
  }
  catch (error) {
    Pop.error(error, "COULD NOT CREATE ENTRY!");
    logger.log("Could not create Entry!", error)
  }
}

</script>


<template>
  <div class="modal" tabindex="-1" id="entryModal" aria-labelledby="entryModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="entryModal" aria-labelledby="entryModal">Create A New Entry</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createEntry()">
            <div class="mb-3">
              <label for="description" class="form-label">Example textarea</label>
              <textarea v-model="formData.description" class="form-control" id="description" rows="3" required
                maxlength="2000"></textarea>
            </div>
            <div class="mb-3">
              <label for="entry-img" class="form-label">Upload Image</label>
              <input v-model="formData.img" class="form-control" type="url" id="entry-img" name="image" maxlength="500">
            </div>
            <div class="mb-3">
              <label for="entry-img" class="form-label">Image Preview</label>
              <div class="form-control">
                <img class="imagePreview" :src="formData.img" alt="">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Create</button>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.imagePreview {
  width: 100%;
  height: 100%;
}
</style>