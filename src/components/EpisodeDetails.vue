<template>
  <div class="episode-details">
    <EpisodeItem
      :episode="episode"
      :name="name"
    >
      <div class="episode-details__info">
        <span class="episode-details__label">Air date</span>
        <span class="episode-details__value">{{ airDate }}</span>
      </div>
    </EpisodeItem>
  </div>
</template>

<script>
import EpisodeItem from '@/components/EpisodeItem';

export default {
  components: {
    EpisodeItem,
  },

  props: {
    episode: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    airDate: {
      type: String,
      default: '-',
    },
  },
};
</script>

<style scoped lang="scss">
  .episode-details {
    margin-bottom: 20px;

    &__info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid $c-border;
    }

    &__value {
      color: $c-text-secondary;
    }
  }
</style>
