<template>
  <ul class="episodes-list">
    <template v-if="isLoading">
      <li
        v-for="i in 6"
        :key="i"
      >
        <content-placeholders class="fake-item">
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
  @media #{$tablet-up} {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    display: block;
    margin-bottom: 15px;

    @media #{$tablet-up} {
      flex-basis: 50%;
      padding: 0 7.5px;
    }

    @media #{$desktop-up} {
      flex-basis: 33.333%;
    }
  }
}

.fake-item {
  padding: 15px 50% 15px 15px;
  background: #fff;
  border-radius: 15px;

  @media #{$tablet-up} {
    padding-right: 30%;
  }
}
</style>
