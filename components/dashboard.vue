<template>
  <div class="dashboard-layout">
    <div class="client-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-invoice']" />
      </div>
      <div class="dashboard-panel">{{ dashboard_report.end_user_count__sum }} 家秘書公司</div>
    </div>
    <div class="company-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-invoice-dollar']" />
      </div>
      <div class="dashboard-panel">{{ dashboard_report.company_count__sum }} 家公司</div>
    </div>
    <div class="pending-document-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'receipt']" />
      </div>
      <div class="dashboard-panel">{{ dashboard_report.pending_file_count__sum }} 份待審批文件</div>
    </div>
    <div class="approved-document-dashboard">
      <svg class="progress-ring">
        <circle class="progress-ring-circle" :stroke-dashoffset="200" />
      </svg>
      <div class="icon-panel">
        <fa-icon :icon="['fas', 'file-alt']" />
      </div>
      <div class="dashboard-panel">{{ dashboard_report.passed_file_count__sum }} 份已輜批文件</div>
    </div>
  </div>
</template>

<script>
  import dashboard from "~/store/dashboard";
  import { mapGetters } from "vuex";

  export default {
    props: {},
    data() {
      return {};
    },
    async fetch() {
      await this.$store.dispatch("dashboard/getDashboardReport");
    },
    computed: {
      ...mapGetters({
        dashboard_report: "dashboard/dashboard_report",
      }),
    },
    created() {
      if (!this.$store.hasModule("dashboard")) {
        this.$store.registerModule("dashboard", dashboard);
      }
    },
    methods: {},
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
