<template>
  <ul class="episodes-list">
    <template v-if="isLoading">
      <li
        v-for="i in 6"
        :key="i"
        class="fake-item"
      >
        <content-placeholders>
          <content-placeholders-heading />
        </content-placeholders>
      </li>
    </template>
    <template v-else>
      <li
        v-for="episode in episodes"
        :key="episode.episode"
      >
        <slot :episode="episode" />
      </li>
    </template>
  </ul>
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

<style scoped lang="scss">
.episodes-list {
  li {
    display: block;
    margin-bottom: 15px;
  }
}

.fake-item {
  padding: 15px 50% 15px 15px;
  background: #fff;
  border-radius: 15px;
}
</style>
