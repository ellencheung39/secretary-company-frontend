<template>
  <div class="login-layout">
    <div class="logo-panel">
      <logo />
    </div>
    <lazy-form :key="form_key" class="login-form" :fields="fields" @submit="login" />
  </div>
</template>

<script>
  import user from "~/store/user";
  import { mapGetters } from "vuex";

  export default {
    layout() {
      return "footerOnly";
    },
    async middleware({ store, redirect }) {
      await store.dispatch("user/getUserFromCookie");
      if (store.state.user.current_user && store.state.user.current_user.token) {
        return redirect("/companySecretary");
      }
    },
    data() {
      return {
        form_key: 0,
        fields: [
          {
            label: "用戶名*",
            placeholder: "用戶名",
            display_type: "icon_input",
            type: "text",
            icon: ["fas", "edit"],
            data_location: "username",
          },
          {
            label: "密碼*",
            placeholder: "密碼*",
            display_type: "icon_input",
            type: "password",
            is_password: true,
            icon: ["fas", "edit"],
            data_location: "password",
          },
          {
            label: "記住我*",
            display_type: "addon_checkbox",
            data_location: "is_remember_me",
          },
        ],
      };
    },
    async fetch() {
      this.form_key += 0;
    },
    computed: {
      ...mapGetters({}),
    },
    created() {
      if (!this.$store.hasModule("user")) {
        this.$store.registerModule("user", user);
      }
    },
    methods: {
      login(payload) {
        this.$store.dispatch("user/login", payload);
      },
    },
  };
</script>

<style scoped lang="scss">
  .login-layout {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    .logo-panel {
      height: 260px;
      width: 325px;
      margin-bottom: 85px;
    }

    .login-form {
      padding: 30px 30px;
    }
  }
</style>
