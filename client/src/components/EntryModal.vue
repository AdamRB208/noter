<script setup>
import { ref } from 'vue';



const formData = ref({
  description: '',
  img: '',
})

</script>


<template>
  <div class="modal" tabindex="-1" id="entryModal" aria-labelledby="entryModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="entryModal" aria-labelledby="entryModal">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="description" class="form-label">Example textarea</label>
              <textarea v-model="formData.description" class="form-control" id="description" rows="3" required
                maxlength="2000"></textarea>
            </div>
            <div class="mb-3">
              <label for="img" class="form-label">Upload Image</label>
              <input v-model="formData.img" class="form-control" type="url" required id="img" name="image"
                maxlength="500">
            </div>
            <div class="mb-3">
              <label for="img" class="form-label">Image Preview</label>
              <img class="imagePreview" :src="formData.img" :alt="`preview image of ${formData.img}`">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>