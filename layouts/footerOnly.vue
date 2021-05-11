<template>
  <div class="main-layout">
    <nuxt />
    <lazy-footer class="mainpage-footer-panel" />
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    async fetch() {},
    computed: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  .main-layout {
    display: grid;
    grid-template-rows: auto 80px;
  }

  .mainpage-footer-panel {
    grid-row: 2/3;
  }
</style>
