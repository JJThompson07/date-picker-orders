<template>
  <div class="wrapper">
    <div class="loader">
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.loader {
  height: 50px;
  width: 50px;
  margin: 2rem;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #2c3e50;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }

}

</style>
