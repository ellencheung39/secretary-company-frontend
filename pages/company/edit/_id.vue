<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-form :key="form_key" :fields="fields" :data="company" @submit="save_company" />
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
        form_key: 0,
        fields: [
          {
            label: "商業登記號 (BR)",
            type: "text",
            data_location: "business_registration",
          },
          {
            label: "公司註冊號 (CR)",
            type: "text",
            data_location: "certificate_registration",
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
    async fetch() {
      await this.$store.dispatch("company/getCompany", {
        id: this.$route.params["id"],
      });
      this.form_key += 1;
    },
    computed: {
      ...mapGetters({
        company: "company/company",
      }),
      subTitle: function () {
        return `客戶: ${this.company.end_user.username} -> 修改公司`;
      },
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
    },
    methods: {
      save_company(payload) {
        this.$store.dispatch("company/saveCompany", { id: this.$route.params["id"], ...payload });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
