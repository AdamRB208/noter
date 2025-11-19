<script setup>

</script>


<template>
  <form>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="mb-3">
      <label for="imageUpload" class="form-label">Upload Image</label>
      <input class="form-control" type="file" id="imageUpload" accept="image/*">
    </div>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
  </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>


<style lang="scss" scoped></style>