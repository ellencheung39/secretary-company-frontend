<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-list class="list" :list_desc="list_desc" :columns="columns" :search="company_list_search" :data="company_list_data" @update_search="update_company_list" />
    </div>
  </div>
</template>

<script>
  import company from "~/vuex/company";
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
            url_desc: "修改 / 詳情",
          },
        ],
        list_desc: {
          title: "公司列表",
          desc: "家公司",
          url: "/company/edit/",
        },
      };
    },
    computed: {
      ...mapGetters({
        company_list_data: "company/company_list_data",
        company_list_search: "company/company_list_search",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    async fetch() {
      await this.$store.dispatch("company/getDefaultCompanyList");
    },
    methods: {
      async update_company_list(payload) {
        await this.$store.dispatch("company/getDefaultCompanyList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>