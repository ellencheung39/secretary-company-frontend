<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :limit="limit" :page-no="offset" :count="count" :data="company_list" @update_search="update_company_list" />
    </div>
  </div>
</template>

<script>
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司列表",
        limit: 20,
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
          title: "公司列表",
          desc: "家公司",
          url: "/company/edit/",
        },
      };
    },
    async fetch() {
      if (this.offset === null) {
        await this.$store.dispatch("company/getCompanyList", { offset: 0, limit: 20 });
      }
    },
    computed: {
      ...mapGetters({
        company_secretary_list: "companySecretary/company_secretary_list",
        offset: "companySecretary/offset",
        count: "companySecretary/count",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    methods: {
      async update_company_list(payload) {
        await this.$store.dispatch("company/getCompanyList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
</style>