<script setup>

</script>


<template>
  <div class="col-md-2 m-5">
    <button class="btn btn-primary btn-rounded text-light" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#manageNotebooks" aria-controls="manageNotebooks">Notebooks</button>
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
    </div>
  </div>
</template>


<style lang="scss" scoped>
.offcanvas-start {
  background-color: rgba(72, 71, 71, 0.831);
}
</style>