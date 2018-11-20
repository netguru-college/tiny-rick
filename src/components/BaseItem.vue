<template>
  <div class="base-item">
    <header class="base-item__header">
      <img
        v-if="img"
        class="base-item__img"
        :src="img"
      >
      <div class="base-item__header-content">
        <h3 class="base-item__title">{{ title }}</h3>
        <span class="base-item__subtitle">{{ subtitle }}</span>
      </div>
    </header>
    <p
      v-if="hasSlot"
      class="base-item__content"
    >
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      default: null,
    },
  },

  computed: {
    hasSlot() {
      return Boolean(this.$slots.default);
    },
  },
};
</script>

<style scoped lang="scss">
.base-item {
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: #fff;
  border-radius: 15px;
  color: $c-text-primary;

  &__header {
    display: flex;
    align-items: center;
  }

  &__header-content {
    flex: 1;
  }

  &__img {
    margin-right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  &__title {
    margin: 0;
    font-size: 15px;
  }

  &__subtitle {
    font-size: 13px;
    color: $c-text-secondary;
  }

  &__content {
    margin: 10px 0;
    font-size: 12px;
    line-height: 1.4em;
    color: $c-text-secondary;
  }
}
</style>
