<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-dashboard class="dashboard" />
      <lazy-list class="list" :list_desc="list_desc" :columns="columns" :search="company_secretary_list_search" :data="company_secretary_list_data" @update_search="update_company_secretary_list" />
    </div>
  </div>
</template>

<script>
  import companySecretary from "~/vuex/companySecretary";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司列表",
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
            url_desc: "修改 / 詳情 / 客戶列表",
          },
        ],
        list_desc: {
          title: "秘書公司列表",
          desc: "家公司",
          url: "/companySecretary/edit/",
          is_create_enabled: true,
        },
      };
    },
    async fetch() {
      await this.$store.dispatch("companySecretary/getDefaultCompanySecretaryList");
    },
    computed: {
      ...mapGetters({
        company_secretary_list_data: "companySecretary/company_secretary_list_data",
        company_secretary_list_search: "companySecretary/company_secretary_list_search",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
    },
    methods: {
      async update_company_secretary_list(payload) {
        await this.$store.dispatch("companySecretary/getDefaultCompanySecretaryList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>