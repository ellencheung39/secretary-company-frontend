<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-form :key="form_key" :fields="fields" :data="current_company" @submit="save_company" />
    </div>
  </div>
</template>

<script>
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司詳情",
        subTitle: this.$route.params["id"] ? "客戶: 陳大文 -> 修改公司" : "客戶: 陳大文 -> 新增公司",
        form_key: 0,
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
            display_type: "text",
            data: "Eric Lee Com Sec Limited",
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
      this.form_key += 1;
    },
    methods: {
      save_company(payload) {
        this.$fetch();
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
