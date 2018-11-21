<template>
  <div id="app">
    <TheHeader />
    <main class="main">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';

export default {
  components: {
    TheHeader,
  }
}
</script>

<style lang="scss" src="@/styles/app.scss"></style>
