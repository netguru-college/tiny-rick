<template>
  <transition-group
    name="fade"
    class="episodes__list"
    tag="ul"
  >
    <template v-if="isLoading">
      <li
        v-for="i in 6"
        :key="i"
      >
        <content-placeholders class="episodes__fake-item">
          <content-placeholders-heading />
        </content-placeholders>
      </li>
    </template>
    <template v-else>
      <li
        v-for="episode in episodes"
        :key="episode.id"
      >
        <router-link :to="{ name: 'episode', params: { id: episode.id } }">
          <slot :episode="episode" />
        </router-link>
      </li>
    </template>
  </transition-group>
</template>

<script>
export default {
  props: {
    episodes: {
      type: Array,
      default: null,
    },
    isLoading: {
      type: Boolean,
    },
  }
};
</script>
