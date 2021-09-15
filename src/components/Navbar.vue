<template>
  <nav class="nav">
    <h1 class="nav__title">Feed It Back To Me</h1>
    <div class="nav__links">
<!--      <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>-->
<!--      <router-link :to="{ name: 'Orders' }" class="nav-link">Orders</router-link>-->
<!--      <router-link :to="{ name: 'Guests' }" class="nav-link">Guests</router-link>-->
    </div>
  </nav>
</template>

<script>
export default {
name: "Navbar",
  setup() {

  }
}
</script>

<style scoped lang="scss">
.nav {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);
  color: white;
  box-shadow: 2px 2px 5px rgba(50,50,50,0.4);
  z-index: 1;

  &__title {
    padding: 0.5rem 1rem;
  }

  &__links {
    display: flex;
    gap: 1rem;
  }

  &-link {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid transparent;
    font-size: 1.25rem;

    &:hover,
    &:focus {
      color: var(--secondary);
      border-bottom-color: var(--secondary);
    }

    &.router-link-active {
      color: var(--primary);
      border-bottom-color: var(--primary);
    }
  }
}

</style>
