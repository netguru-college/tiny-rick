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
