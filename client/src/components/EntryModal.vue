<script setup>
import { AppState } from '@/AppState.js';
import { entrysService } from '@/services/EntrysService.js';
import { notebookService } from '@/services/NotebookService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref, watch, computed } from 'vue';


const props = defineProps({
  mode: { type: String, default: 'new' },
  entry: { type: Object, default: null }
})

const formData = ref({
  description: '',
  img: '',
  id: null
})

// handle mode/entry changes
watch(() => props.mode, (m) => {
  if (m === 'new') {
    formData.value = { description: '', img: '', id: null }
  } else if (m === 'edit' && props.entry) {
    formData.value = {
      description: props.entry.description || '',
      img: props.entry.img || '',
      id: props.entry.id || props.entry._id || null
    }
  }
})

watch(() => props.entry, (e) => {
  if (props.mode === 'edit' && e) {
    formData.value = {
      description: e.description || '',
      img: e.img || '',
      id: e.id || e._id || null
    }
  }
})

const title = computed(() => props.mode === 'edit' ? 'Edit Entry' : 'Create A New Entry')

// create or update based on mode
async function submitEntry() {
  try {
    if (props.mode === 'new') {
      await entrysService.createEntry(formData.value)
    } else {
      await entrysService.editEntry(formData.value.id, {
        description: formData.value.description,
        img: formData.value.img
      })
    }
    const notebookId = AppState.activeNotebook?.id
    if (notebookId) {
      await notebookService.getNotebookById(notebookId)
    }
    formData.value = { description: '', img: '', id: null }
    Modal.getOrCreateInstance(document.getElementById('entryModal')).hide()
  }
  catch (error) {
    Pop.error(error, "COULD NOT SAVE ENTRY!");
    logger.log("Could not save Entry!", error)
  }
}

</script>


<template>
  <div class="modal" tabindex="-1" id="entryModal" aria-labelledby="entryModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitEntry()">
            <div class="mb-3">
              <label for="description" class="form-label">Text Area</label>
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
            <button type="submit" class="btn btn-primary">{{ props.mode === 'edit' ? 'Save' : 'Create' }}</button>
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