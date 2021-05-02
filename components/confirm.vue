<template>
  <div class="confirm-layout">
    <template v-for="(f, f_i) in fields">
      <div v-if="f.type=='checkbox'" class="display-field" :key="`field_${f_i}`">
        <label>{{ f.label }}</label>
        <fa-icon :icon="['far',data[f.data_location]?'check-square':'square']" />
      </div>
      <div v-else class="display-field" :key="`field_${f_i}`">
        <label>{{ f.label }}</label>
        <div class="display-field">{{ data[f.data_location] }}</div>
      </div>
    </template>
    <div class="action-panel">
      <button class="primary-button" type="button" @click="$emit('confirm', true)">提交</button>
      <button class="secondary-button" type="button" @click="$emit('confirm', false)">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    props: {
      fields: Array,
      data: Object,
    },
    computed: {},
    created() {},
    async fetch() {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  .confirm-layout {
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: 10px;
    padding: 40px 60px;
  }

  .display-field {
    padding: 5px 0;
    display: grid;
    grid-template-columns: 150px auto;
    align-items: center;
    height: 50px;
    label {
      font-size: 16px;
      margin-right: 15px;
    }
  }

  .action-panel {
    padding: 10px 0;
    & > * {
      margin-right: 10px;
    }
  }
</style>
