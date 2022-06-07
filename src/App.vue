<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Calendar Test</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: this.$route && this.$route.path
    };
  },
  watch: {
    $route(route) {
      this.path = route.path;
    }
  }
};
</script>
<style lang="scss">
.page {
  padding: 20px;
}
</style>