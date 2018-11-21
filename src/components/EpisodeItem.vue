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
