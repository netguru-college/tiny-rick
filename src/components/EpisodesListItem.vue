<template>
  <a
    href="#"
    class="episode"
  >
    <h3 class="episode-num">Episode {{ episodeData.episodeNum }}</h3>
    <h2 class="episode-name">{{ name }}</h2>
    <span class="episode-season">
      Season {{ episodeData.season }}
    </span>
  </a>
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
.episode {
  display: block;
  position: relative;
  padding: 15px 12px;
  background: #fff;
  border-radius: 15px;
  color: $c-text-primary;
}

.episode-num,
.episode-name {
  margin: 0;
  font-weight: normal;
  font-size: 18px;
}

.episode-name {
  color: $c-text-secondary;
}

.episode-season {
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
</style>
