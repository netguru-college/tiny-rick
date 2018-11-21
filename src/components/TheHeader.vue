<template>
  <header class="header">
    <router-link
      to="/"
      class="header__logo"
    >
      <Logo />
    </router-link>

    <button
      class="header__nav-trigger"
      @click="toggleNav"
    >
      <CloseIcon v-if="isNavVisible" />
      <NavIcon v-else />
    </button>

    <nav
      class="header__nav"
      :class="{
        'is-visible': isNavVisible
      }"
    >
      <router-link
        class="header__nav-link"
        to="/"
      >
        Episodes
      </router-link>
      <router-link
        class="header__nav-link"
        to="/quiz"
      >
        Quiz
      </router-link>
    </nav>
  </header>
</template>

<script>
import Logo from '@/assets/logo.svg';
import NavIcon from '@/assets/icon-menu.svg';
import CloseIcon from '@/assets/icon-close.svg';

export default {
  components: {
    Logo,
    NavIcon,
    CloseIcon,
  },

  data() {
    return {
      isNavVisible: false,
    };
  },

  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    },
  },
};
</script>
