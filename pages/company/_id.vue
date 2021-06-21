<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :limit="limit" :page-no="offset" :count="count" :data="company_list" @update_search="update_company_list" />
    </div>
  </div>
</template>

<script>
  import user from "~/store/user";
  import client from "~/store/client";
  import company from "~/store/company";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "公司列表",
      };
    },
    fetch() {
      this.$store.dispatch("client/getClient", { id: this.$route.params["id"] });
      this.$store.dispatch("company/getCompanyList", { id: this.$route.params["id"] });
    },
    computed: {
      ...mapGetters({
        client: "client/client",
        company_list: "company/company_list",
        offset: "company/offset",
        count: "company/count",
        limit: "company/limit",
        user_type: "user/user_type",
      }),
      listDesc: function () {
        return {
          title: `${this.client ? this.client.name : ""}公司列表`,
          desc: "家公司",
          url: this.user_type != 9 && this.$route.params["id"] ? `/company/create/${this.$route.params["id"]}` : null,
        };
      },
      columns: function () {
        return [
          {
            label: "CR",
            data_location: "certificate_registration",
          },
          {
            label: "BR",
            data_location: "business_registration",
          },
          {
            label: "客戶名稱",
            data_location: "end_user.username",
          },
          {
            label: "公司中文名",
            data_location: "company_chinese_name",
          },
          {
            label: "English Name",
            data_location: "company_english_name",
          },
          {
            label: "公司秘書",
            data_location: "secretary.username",
          },
          {
            label: "操作",
            action:
              this.user_type == 9
                ? [
                    {
                      label: "文件列表",
                      url: "/document/",
                    },
                  ]
                : [
                    {
                      label: "修改",
                      url: "/company/edit/",
                    },
                    {
                      label: "詳情",
                      url: "/company/delete/",
                    },
                    {
                      label: "文件列表",
                      url: "/document/",
                    },
                  ],
          },
        ];
      },
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
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