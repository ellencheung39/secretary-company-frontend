const { join } = require('path')

module.exports = {
  apps: [{
    name            : "secretary-company-nuxt",
    script          : "./node_modules/nuxt/bin/nuxt.js",
    exec_mode       : "cluster",
    watch           : false,
    instances       : "0",
    merge_logs      : true,
    log_type        : "raw",
    cwd: "./",
    node_args: "-r dotenv/config --max-http-header-size=102400",
    args: `-c ${join(__dirname, 'nuxt.config.js')} start`
  }]
};
