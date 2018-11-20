<template>
  <div class="episode-item">
    <h3 class="episode-item__num">Episode {{ episodeData.episodeNum }}</h3>
    <h2 class="episode-item__name">{{ name }}</h2>
    <span class="episode-item__season-badge">
      Season {{ episodeData.season }}
    </span>
    <slot />
  </div>
</template>

<script>
const parseEpisodeId = id => {
  const [season, episode] = id.slice(1).split(/e|E/);
  return {
    season: Number(season),
    episodeNum: Number(episode),
  };
};

export default {
  props: {
    episode: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },

  computed: {
    episodeData() {
      return parseEpisodeId(this.episode);
    },
  }
};
</script>

<style scoped lang="scss">
.episode-item {
  display: block;
  position: relative;
  padding: 15px 12px;
  background: #fff;
  border-radius: 15px;
  color: $c-text-primary;

  &__num,
  &__name {
    margin: 0;
    font-weight: normal;
    font-size: 18px;
  }

  &__name {
    color: $c-text-secondary;
  }

  &__season-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    margin: auto;
    background-color: $c-green;
    color: #fff;
    border-radius: 15px;
    padding: 4px 10px;
    font-size: 12px;
    text-transform: uppercase;
  }
}
</style>
