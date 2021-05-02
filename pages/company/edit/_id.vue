<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub_title="sub_title" />
      <lazy-form :key="form_key" :fields="fields" :data="current_client" @submit="save_client" />
    </div>
  </div>
</template>

<script>
  import client from "~/vuex/client";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "秘書公司",
        sub_title: this.$route.params["id"] ? "修改秘書公司" : "新增秘書公司",
        form_key: 0,
        fields: [
          {
            label: "秘書公司名稱",
            type: "text",
            data_location: "client_name",
          },
          {
            label: "用戶名稱",
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
          {
            label: "地址",
            type: "text",
            data_location: "address",
          },
          {
            label: "聯絡人",
            type: "text",
            data_location: "contact_person",
          },
          {
            label: "是否持牌",
            type: "checkbox",
            data_location: "is_Licensed",
          },
          {
            label: "持牌人",
            type: "text",
            data_location: "licensee",
          },
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
      await this.$store.dispatch("client/getDefaultCurrenctClient", {
        id: this.$route.params["id"],
      });
      this.form_key += 1;
    },
    methods: {
      save_client(payload) {
        this.$fetch();
      },
    },
  };
</script>

<style scoped lang="scss">
  .sub-title {
    padding: 40px 0;
    font-size: 22px;
  }
</style>
