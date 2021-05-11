<template>
  <div class="dashboard-layout">
    <div class="client-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-invoice']" />
      </div>
      <div class="dashboard-panel">{{ client_list_search.total_count }} 家秘書公司</div>
    </div>
    <div class="company-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-invoice-dollar']" />
      </div>
      <div class="dashboard-panel">{{ company_list_search.total_count }} 家公司</div>
    </div>
    <div class="pending-document-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'receipt']" />
      </div>
      <div class="dashboard-panel">{{ document_list_search.total_count }} 份待審批文件</div>
    </div>
    <div class="approved-document-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-alt']" />
      </div>
      <div class="dashboard-panel">{{ document_list_search.total_count }} 份已輜批文件</div>
    </div>
  </div>
</template>

<script>
  import client from "~/vuex/client";
  import company from "~/vuex/company";
  import document from "~/vuex/document";
  import { mapGetters } from "vuex";

  export default {
    props: {},
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        client_list_search: "client/client_list_search",
        company_list_search: "company/company_list_search",
        document_list_search: "document/document_list_search",
      }),
    },
    created() {
      if (!this.$store.hasModule("client")) {
        this.$store.registerModule("client", client);
      }
      if (!this.$store.hasModule("company")) {
        this.$store.registerModule("company", company);
      }
      if (!this.$store.hasModule("document")) {
        this.$store.registerModule("document", document);
      }
    },
    async fetch() {
      this.form_data = Object.assign({}, this.data);
    },
    methods: {
      submit_form() {
        this.$emit("submit", this.form_data);
      },
    },
  };
</script>

<style scoped lang="scss">
  .dashboard-layout {
    background-color: $white;
    box-shadow: $box-shadow;
    padding: 30px 80px;
    display: flex;
    justify-content: space-between;
    & > div {
      position: relative;
    }
  }
  .progress-ring {
    height: 120px;
    width: 120px;
  }
  .progress-ring-panel {
    position: relative;
  }
  .progress-ring-circle {
    stroke-dasharray: 326.726, 326.726;
    transition: 0.35s stroke-dashoffset;
    stroke-width: 6;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    fill: transparent;
    r: 52;
    cx: 60;
    cy: 60;
  }

  .icon-panel {
    font-size: 50px;
    position: absolute;
    top: 60px;
    left: 60px;
    transform: translate(-50%, -50%);
  }
  .dashboard-panel {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .client-dashboard {
    color: #00aff0;
    stroke: #00aff0;
  }

  .company-dashboard {
    color: #71d875;
    stroke: #71d875;
  }

  .pending-document-dashboard {
    color: #fa607e;
    stroke: #fa607e;
  }

  .approved-document-dashboard {
    color: #ffc107;
    stroke: #ffc107;
  }
</style>
