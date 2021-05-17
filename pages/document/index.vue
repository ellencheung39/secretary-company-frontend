<template>
  <div class="mainpage-layout">
    <div class="content-panel">
      <lazy-list class="list" :list-desc="listDesc" :columns="columns" :search="document_list_search" :data="document_list_data" @update_search="update_document_list" />
    </div>
  </div>
</template>

<script>
  import document from "~/store/document";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        title: "文件清單",
        columns: [
          {
            label: "SN",
            data_location: "sn",
          },
          {
            label: "CI",
            data_location: "ci",
          },
          {
            label: "br",
            data_location: "br",
          },
          {
            label: "客戶名稱",
            data_location: "client_name",
          },
          {
            label: "文件名",
            data_location: "document_name",
          },
          {
            label: "檔案名",
            data_location: "document_path",
          },
          {
            label: "上傳日期",
            data_location: "upload_dt",
          },
          {
            label: "操作",
            url_desc: "詳情 / 下載",
          },
        ],
        listDesc: {
          title: "文件清單",
          desc: "份文件",
          url: "/document/edit/",
          search_addon: [{
            label: "分類",
            data_location: "type",
          }],
        },
      };
    },
    computed: {
      ...mapGetters({
        document_list_data: "document/document_list_data",
        document_list_search: "document/document_list_search",
      }),
    },
    created() {
      this.$store.dispatch("setPage", { page_name: this.title });
      if (!this.$store.hasModule("document")) {
        this.$store.registerModule("document", document);
      }
    },
    async fetch() {
      await this.$store.dispatch("document/getDefaultDocumentList");
    },
    methods: {
      async update_document_list(payload) {
        await this.$store.dispatch("document/getDefaultDocumentList", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard {
    margin: 30px 0;
  }
</style>