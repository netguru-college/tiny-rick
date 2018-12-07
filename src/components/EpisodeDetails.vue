<template>
  <div class="episode-details">
    <EpisodeItem
      :episode="episode"
      :name="name"
    >
      <div class="episode-info">
        <span class="episode-info__label">Air date</span>
        <span class="episode-info__value">{{ airDate }}</span>
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
