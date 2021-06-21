<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-display :key="display_key" :fields="fields" :data="company_secretary" @submit="delete_company_secretary" />
    </div>
  </div>
</template>

<script>
  import companySecretary from "~/store/companySecretary";
  import { mapGetters } from "vuex";

  export default {
    middleware({ route, redirect }) {
      if (!route.params["id"]) return redirect("/companySecretary");
    },
    data() {
      return {
        title: "秘書公司",
        subTitle: "移除秘書公司",
        display_key: 0,
        fields: [
          {
            label: "用戶名稱",
            type: "text",
            data_location: "username",
          },
          {
            label: "密碼",
            type: "password",
            data_location: "password",
          },
          {
            label: "秘書公司名稱",
            type: "text",
            data_location: "name",
          },
          {
            label: "電郵",
            type: "text",
            data_location: "email",
          },
          {
            label: "聯絡人",
            type: "text",
            data_location: "contact",
          },
          {
            label: "地址",
            type: "text",
            data_location: "address",
          },
          {
            label: "是否持牌",
            type: "checkbox",
            data_location: "is_licensed",
          },
          {
            label: "持牌人",
            type: "text",
            data_location: "licensee",
          },
        ],
      };
    },
    async fetch() {
      await this.$store.dispatch("companySecretary/getCompanySecretary", { id: this.$route.params["id"] });
      this.display_key += 0;
    },
    computed: {
      ...mapGetters({
        company_secretary: "companySecretary/company_secretary",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
    },
    methods: {
      delete_company_secretary() {
        this.$store.dispatch("companySecretary/deleteCompanySecretary", { id: this.$route.params["id"] });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
