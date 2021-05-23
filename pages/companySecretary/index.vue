<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-dashboard class="dashboard" />
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :limit="limit" :page-no="offset" :count="count" :data="company_secretary_list" @update_search="update_company_secretary_list" />
    </div>
  </div>
</template>

<script>
  import companySecretary from "~/store/companySecretary";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司列表",
        limit: 20,
        columns: [
          {
            label: "秘書公司名稱",
            data_location: "name",
          },
          {
            label: "電郵",
            data_location: "email",
          },
          {
            label: "聯絡人",
            data_location: "contact",
          },
          {
            label: "地址",
            data_location: "address",
          },
          {
            label: "是否持牌",
            data_location: "is_licensed",
          },
          {
            label: "持牌人",
            data_location: "licensee",
          },
          {
            label: "操作",
            url_desc: "修改 / 詳情 / 客戶列表",
          },
        ],
        listDesc: {
          title: "秘書公司列表",
          desc: "家公司",
          url: "/companySecretary/edit/",
          is_create_enabled: true,
        },
      };
    },
    async fetch() {
      if (this.offset === null) {
        await this.$store.dispatch("companySecretary/getCompanySecretaryList", { offset: 0, limit: 20 });
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
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
    },
    methods: {
      async update_company_secretary_list(payload) {
        await this.$store.dispatch("companySecretary/getCompanySecretaryList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>