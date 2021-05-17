<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :search="client_list_search" :data="client_list_data" @update_search="update_client_list" />
    </div>
  </div>
</template>

<script>
  import client from "~/store/client";
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "客戶列表",
        subTitle: `秘書公司名稱：ABC Com Sec Limited`,
        current_company: {},
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
            url_desc: "修改 / 詳情",
          },
        ],
        listDesc: {
          title: "客戶列表",
          desc: "家公司",
          url: "/client/edit/",
          // is_create_enabled: false,
        },
      };
    },
    async fetch() {
      await this.$store.dispatch("client/getDefaultClientList");
      this.current_company = await this.$store.dispatch(
        "company/getDefaultCurrentCompany",
        {
          id: this.$route.params["id"],
        }
      );
    },
    computed: {
      ...mapGetters({
        client_list_data: "client/client_list_data",
        client_list_search: "client/client_list_search",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
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