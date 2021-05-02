<template>
  <div class="sub-title-layout">{{ sub_title }}</div>
</template>
<script>
  export default {
    props: {
      sub_title: String,
    },
  };
</script>

<style scoped lang="scss">
  .sub-title-layout {
    padding: 30px 0 40px;
    font-size: 18px;
  }
</style>
