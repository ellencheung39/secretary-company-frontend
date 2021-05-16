<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub_title="sub_title" />
      <lazy-display :key="display_key" :fields="fields" :data="current_company_secretary" @submit="delete_company_secretary" />
    </div>
  </div>
</template>

<script>
  import companySecretary from "~/vuex/companySecretary";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "秘書公司",
        sub_title: "移除秘書公司",
        display_key: 0,
        fields: [
          {
            label: "秘書公司名稱",
            type: "text",
            data_location: "company_secretary_name",
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
        current_company_secretary: "companySecretary/current_company_secretary",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
    },
    async fetch() {
      await this.$store.dispatch("companySecretary/getDefaultCurrentCompanySecretary", {
        id: this.$route.params["id"],
      });
      this.display_key += 1;
    },
    methods: {
      delete_company_secretary(payload) {
        this.$fetch();
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
