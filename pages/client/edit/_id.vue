<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-form :key="form_key" :fields="fields" :data="client" @submit="save_client" />
    </div>
  </div>
</template>

<script>
  import client from "~/store/client";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        subTitle: this.$route.params["id"] ? "修改客戶" : "新增客戶",
        form_key: 0,
        fields: [
          {
            label: "用戶名稱",
            display_type: this.$route.params["id"] ? "text" : null,
            type: "text",
            data_location: "username",
          },
          {
            label: "密碼",
            type: "password",
            data_location: "password",
          },
          {
            label: "客戶名稱",
            type: "text",
            data_location: "name",
          },
          {
            label: "電話",
            type: "text",
            data_location: "phone",
          },
          {
            label: "電郵",
            type: "text",
            data_location: "email",
          },
        ],
      };
    },
    async fetch() {
      await this.$store.dispatch("client/getClient", {
        id: this.$route.params["id"],
      });
      this.form_key += 1;
    },
    computed: {
      ...mapGetters({
        client: "client/client",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
    },
    methods: {
      async save_client(payload) {
        await this.$store.dispatch("client/saveClient", { id: this.$route.params["id"], ...payload });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
