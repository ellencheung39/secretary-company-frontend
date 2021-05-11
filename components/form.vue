<template>
  <form class="form-layout" @submit.prevent="submit_form">
    <template v-for="(f, f_i) in fields">
      <div v-if="f.display_type=='icon_input'" :key="`field_${f_i}`" class="icon-input">
        <label :for="f.data_location">{{ f.label }}</label>
        <div class="input-panel">
          <div class="icon-panel">
            <fa-icon :icon="['far', 'edit']" />
          </div>
          <input :id="f.data_location" v-model="form_data[f.data_location]" type="text" :placeholder="f.placeholder" />
        </div>
      </div>
      <div v-else-if="f.display_type=='addon_checkbox'" :key="`field_${f_i}`" class="addon-checkbox-input">
        <input v-model="form_data[f.data_location]" :for="f.data_location" type="checkbox" />
        <label :for="f.data_location">{{ f.label }}</label>
      </div>
      <div v-else :key="`field_${f_i}`" class="default-input">
        <label :for="f.data_location">{{ f.label }}</label>
        <input :id="f.data_location" v-model="form_data[f.data_location]" :type="f.type" :placeholder="f.placeholder" />
      </div>
    </template>
    <div class="action-panel">
      <button class="primary-button" type="submit">提交</button>
      <button class="secondary-button" type="button" @click="$fetch">取消</button>
    </div>
  </form>
</template>

<script>
  export default {
    props: {
      fields: Array,
      data: Object,
    },
    data() {
      return { form_data: {} };
    },
    async fetch() {
      this.form_data = Object.assign({}, this.data);
    },
    computed: {},
    created() {},
    methods: {
      submit_form() {
        this.$emit("submit", this.form_data);
      },
    },
  };
</script>

<style scoped lang="scss">
  .form-layout {
    background-color: $white;
    box-shadow: $box-shadow;
    border-radius: 10px;
    padding: 40px 60px;
  }

  .default-input {
    padding: 5px 0;
    display: grid;
    grid-template-columns: 150px auto;
    align-items: center;
    height: 50px;
    label {
      font-size: 16px;
      margin-right: 15px;
    }

    input:not([type="checkbox"]) {
      border: 1px $gray-border solid;
      border-radius: 5px;
      box-sizing: border-box;
      width: 300px;
      padding: 10px;
      font-size: 16px;
    }
  }

  .icon-input {
    padding: 5px 0;
    label {
      display: block;
      font-size: 16px;
      padding: 5px 0;
    }
    .input-panel {
      display: flex;
      align-items: stretch;
      .icon-panel {
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $gray-header;
        background-color: $gray-border;
      }
      input {
        border: 1px $gray-border solid;
        box-sizing: border-box;
        width: 350px;
        padding: 0 15px;
        font-size: 16px;
        &::placeholder {
          color: $gray-reminder;
        }
        &:focus-visible {
          outline: none;
        }
      }
    }
  }

  .addon-checkbox-input {
    display: flex;
    align-items: center;
    padding: 10px 0px;
    input {
      width: 15px;
      height: 15px;
      border: 1px $gray-border solid;
      font-size: 16px;
      margin-right: 7.5px;
    }
    label {
      color: $gray-reminder;
      font-size: 16px;
    }
  }
  .action-panel {
    padding: 10px 0;
    & > * {
      margin-right: 10px;
    }
  }
</style>
