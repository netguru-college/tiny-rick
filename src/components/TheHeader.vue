<template>
  <header class="header">
    <router-link
      to="/"
      class="logo"
    >
      <Logo />
    </router-link>

    <button
      class="nav-trigger"
      @click="toggleNav"
    >
      <CloseIcon v-if="isNavVisible" />
      <NavIcon v-else />
    </button>

    <nav
      class="nav"
      :class="{
        'is-visible': isNavVisible
      }"
    >
      <router-link
        class="nav-link"
        to="/"
      >
        Episodes
      </router-link>
      <router-link
        class="nav-link"
        to="/characters"
      >
        Characters
      </router-link>
      <router-link
        class="nav-link"
        to="/locations"
      >
        Locations
      </router-link>
      <router-link
        class="nav-link"
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

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: $c-header-bg;
}

.logo {
  width: 50px;
  display: block;
}

.nav-trigger {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
  }

  @media #{$desktop-up} {
    display: none;
  }
}

.nav {
  display: none;
  justify-content: center;
  align-items: center;

  &.is-visible {
    display: flex;
  }

  @media #{$tablet-down} {
    position: fixed;
    top: 70px;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    flex-direction: column;
  }

  @media #{$desktop-up} {
    display: flex;
  }
}

.nav-link {
  margin: 15px 0;
  padding: 10px 25px;
  text-transform: uppercase;
  font-size: 20px;

  &.router-link-exact-active {
    background-color: $c-primary;
    border-radius: 12px;
  }

  @media #{$desktop-up} {
    margin: 0 0 0 5px;
    padding: 8px 20px;
    font-size: 15px;
  }
}
</style>
