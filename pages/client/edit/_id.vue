<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-form :key="form_key" :fields="fields" :data="current_client" @submit="save_client" />
    </div>
  </div>
</template>

<script>
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        subTitle: this.$route.params["id"] ? "修改客戶" : "新增客戶",
        form_key: 0,
        fields: [
          {
            label: "客戶名稱",
            type: "text",
            data_location: "client_name",
          },
          {
            label: "Username",
            type: "text",
            data_location: "username",
          },
          {
            label: "電話",
            type: "text",
            data_location: "mobile_no",
          },
          {
            label: "電郵",
            type: "text",
            data_location: "email",
          },
          {
            label: "密碼",
            type: "password",
            data_location: "password",
          },
        ],
      };
    },
    async fetch() {
      await this.$store.dispatch("company/getDefaultCurrenctClient", {
        id: this.$route.params["id"],
      });
      this.form_key += 1;
    },
    computed: {
      ...mapGetters({
        current_client: "company/current_client",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    methods: {
      save_client(payload) {
        this.$fetch(payload);
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
