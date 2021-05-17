<template>
  <div class="sub-title-layout">{{ subTitle }}</div>
</template>
<script>
  export default {
    props: {
      subTitle: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style scoped lang="scss">
  .sub-title-layout {
    padding: 30px 0 40px;
    font-size: 18px;
  }
</style>
