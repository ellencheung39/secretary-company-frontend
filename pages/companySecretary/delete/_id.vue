<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-sub-title :sub-title="subTitle" />
      <lazy-display :key="display_key" :fields="fields" :data="current_company_secretary" @submit="delete_company_secretary" />
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
        company_secretary_list: "companySecretary/company_secretary_list",
      }),
      current_company_secretary: function () {
        return this.company_secretary_list.find((_cs) => _cs.id == this.$route.params["id"]);
      },
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("companySecretary")) {
        this.$store.registerModule("companySecretary", companySecretary);
      }
    },
    methods: {
      delete_company_secretary() {
        //this.$store.dispatch("companySecretary/saveCompanySecretary", { id: this.$route.params["id"], ...payload });
      },
    },
  };
</script>

<style scoped lang="scss">
</style>
