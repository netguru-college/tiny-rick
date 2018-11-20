<template>
  <div id="app">
    <TheHeader />
    <main class="main">
      <router-view />
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


<style lang="scss" src="@/styles/base.scss"></style>

<style scoped lang="scss">
.main {
  margin: 70px auto 0;
  padding: 30px 15px;
  max-width: 1110px;
}
</style>
