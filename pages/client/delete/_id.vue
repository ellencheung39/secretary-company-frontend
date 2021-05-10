<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub_title="sub_title" />
      <lazy-display :key="display_key" :fields="fields" :data="current_client" @submit="delete_client" />
    </div>
  </div>
</template>
<script>
  import client from "~/vuex/client";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        sub_title: "移除客戶",
        display_key: 0,
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
          }
        ],
      };
    },
    computed: {
      ...mapGetters({
        current_client: "client/current_client",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
    },
    async fetch() {
      await this.$store.dispatch(
        "client/getDefaultCurrentClient",
        {
          id: this.$route.params["id"],
        }
      );
      this.display_key += 1;
    },
    methods: {
      delete_client(payload) {
        this.$fetch();
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
