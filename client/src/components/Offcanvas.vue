<script setup>

</script>


<template>
  <div class="col-md-2 m-5">
    <button class="btn btn-primary btn-rounded" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#manageNotebooks" aria-controls="manageNotebooks">Notebooks</button>
  </div>
  <div>
    <div class="offcanvas offcanvas-start" tabindex="-1" id="manageNotebooks" aria-labelledby="manageNotebooks">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="manageNotebooks">Manage Notebooks</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
          etc.
        </div>
        <div class="dropdown mt-3">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Dropdown button
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>