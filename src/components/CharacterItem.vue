<template>
  <BaseItem
    :key="character.id"
    :img="character.image"
    :title="character.name"
    :subtitle="characterInfo"
  />
</template>

<script>
import BaseItem from './BaseItem';

export default {
  components: {
    BaseItem,
  },

  props: {
    character: {
      type: Object,
      required: true,
    },
  },

  computed: {
    characterLocation() {
      const origin = this.character.origin.name;
      return origin === 'unknown' ? `${origin} location` : origin;
    },

    characterInfo() {
      return `${this.character.species} from ${this.characterLocation}`;
    }
  }
};
</script>

<style module lang="scss">

</style>
