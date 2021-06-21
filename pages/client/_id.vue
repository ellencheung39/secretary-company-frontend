<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :limit="limit" :page-no="offset" :count="count" :data="client_list" @update_search="update_client_list" />
    </div>
  </div>
</template>

<script>
  import user from "~/store/user";
  import companySecretary from "~/store/companySecretary";
  import client from "~/store/client";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "客戶列表",
        columns: [
          {
            label: "客戶名稱",
            data_location: "name",
          },
          {
            label: "用戶名稱",
            data_location: "username",
          },
          {
            label: "電郵",
            data_location: "email",
          },
          {
            label: "電話",
            data_location: "phone",
          },
          {
            label: "名下公司",
            data_location: "company_count",
          },
          {
            label: "操作",
            action: [
              {
                label: "修改",
                url: "/client/edit/",
              },
              {
                label: "詳情",
                url: "/client/delete/",
              },
              {
                label: "公司列表",
                url: "/company/",
              },
            ],
          },
        ],
      };
    },
    fetch() {
      this.$store.dispatch("companySecretary/getCompanySecretary", { id: this.$route.params["id"] });
      this.$store.dispatch("client/getClientList");
    },
    computed: {
      ...mapGetters({
        company_secretary: "companySecretary/company_secretary",
        client_list: "client/client_list",
        offset: "client/offset",
        count: "client/count",
        limit: "client/limit",
        user_type: "user/user_type",
      }),
      subTitle: function () {
        if (!this.company_secretary) return null;
        return `秘書公司名稱：${this.company_secretary.name}`;
      },
      listDesc: function () {
        return {
          title: "客戶列表",
          desc: "家公司",
          url: this.user_type == 1 ? "/client/edit/" : null,
        };
      },
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
    },
    methods: {
      async update_client_list(payload) {
        await this.$store.dispatch("client/getClientList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>