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
    async middleware({ store, route, redirect }) {
      if (store.state.user.current_user.is_superuser && !route.params["id"]) {
        return redirect("/companySecretary");
      }
    },
    data() {
      return {
        title: "客戶列表",
        subTitle: `秘書公司名稱：ABC Com Sec Limited`,
        columns: [
          {
            label: "CR",
            data_location: "cr",
          },
          {
            label: "BR",
            data_location: "br",
          },
          {
            label: "客戶名稱",
            data_location: "client_name",
          },
          {
            label: "公司中文名",
            data_location: "company_name_tc",
          },
          {
            label: "English Name",
            data_location: "company_name_en",
          },
          {
            label: "公司秘書",
            data_location: "company_secretary",
          },
          {
            label: "操作",
            action: [
              {
                label: "修改",
                url: "/companySecretary/edit/",
              },
              {
                label: "詳情",
                url: "/companySecretary/delete/",
              },
              {
                label: "客戶列表",
                url: "/client/",
              },
            ],
          },
        ],
      };
    },
    computed: {
      ...mapGetters({
        company_secretary_list: "companySecretary/company_secretary_list",
        client_list: "client/client_list",
        offset: "client/offset",
        count: "client/count",
        limit: "client/limit",
        current_user: "user/current_user",
      }),
      listDesc: function () {
        return {
          title: "客戶列表",
          desc: "家公司",
          url: !this.current_user.is_superuser ? "/client/edit/" : null,
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
        await this.$store.dispatch("client/getDefaultClientList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>