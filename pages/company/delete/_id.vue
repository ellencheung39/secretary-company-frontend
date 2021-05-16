<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub_title="sub_title" />
      <lazy-display :key="display_key" :fields="fields" :data="current_company" @submit="delete_company" />
    </div>
  </div>
</template>

<script>
  import company from "~/vuex/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        sub_title: "客戶: 陳大文 -> 公司詳情",
        display_key: 0,
        fields: [
          {
            label: "商業登記號 (BR)",
            type: "text",
            data_location: "br",
          },
          {
            label: "公司註冊號 (CR)",
            type: "text",
            data_location: "cr",
          },
          {
            label: "公司電話",
            type: "text",
            data_location: "mobile_no",
          },
          {
            label: "公司電郵",
            type: "text",
            data_location: "email",
          },
          {
            label: "註冊日期",
            type: "date",
            data_location: "register_dt",
          },
          {
            label: "公司秘書",
            type: "text",
            data_location: "company_secretary",
          },
          {
            label: "現有董事",
            display_type: "multiple",
            type: "text",
            data_location: "chairperson",
          },
          {
            label: "現有股東",
            display_type: "multiple",
            type: "text",
            data_location: "shareholder",
          },
        ],
      };
    },
    computed: {
      ...mapGetters({
        current_company: "company/current_company",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    async fetch() {
      await this.$store.dispatch("company/getDefaultCurrentCompany", {
        id: this.$route.params["id"],
      });
      this.display_key += 1;
    },
    methods: {
      delete_company(payload) {
        this.$fetch();
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
