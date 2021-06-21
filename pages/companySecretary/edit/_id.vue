<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-form :key="form_key" :fields="fields" :data="company_secretary" @submit="save_company_secretary" />
    </div>
  </div>
</template>

<script>
  import companySecretary from "~/store/companySecretary";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "秘書公司",
        subTitle: this.$route.params["id"] ? "修改秘書公司" : "新增秘書公司",
        fields: [
          {
            label: "用戶名稱",
            display_type: this.$route.params["id"] ? "text" : null,
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
            label: "電話",
            type: "text",
            data_location: "phone",
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
        form_key: 0,
      };
    },
    async fetch() {
      if (this.$route.params["id"]) {
        await this.$store.dispatch("companySecretary/getCompanySecretary", { id: this.$route.params["id"] });
        this.form_key += 1;
      }
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
      save_company_secretary(payload) {
        this.$store.dispatch("companySecretary/saveCompanySecretary", { id: this.$route.params["id"], ...payload });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
