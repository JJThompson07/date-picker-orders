<template>
  <div class="order">
    <div class="order__name">
      {{ order.name }}

    </div>
    <div class="order__details">
      <div class="order__details--content">
        <div class="order__quantity">
                  <span class="small">
                    Qty:
                  </span>
          {{ order.quantity }}
        </div>
        <div class="order__price">
                  <span class="small">
                    Price:
                  </span>
          £{{ order.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleOrder",
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.order {
  display: flex;
  background: white;
  font-weight: bold;
  font-size: 0.9rem;
  flex-flow: row wrap;
  border-radius: 0 0.5rem;
  overflow: hidden;

  &__name {
    padding: 0.5rem 1rem;
    flex: 1;
  }

  &__details {
    display: flex;
    flex: 1;
    gap: 1rem;
    color: white;
    background: var(--secondary);

    &--title {
      padding: 1rem;
      background-color: var(--secondary-dark);
      color: white;
    }

    &--content {
      padding: 0.5rem 1rem;
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
    }
  }
}

</style>
