module.exports = {
    apps: [
      {
        name: "TS-Bot",
        script: "npm",
        args: "start",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        min_uptime: "5m", // 5 minute
        max_restarts: 20,
      },
    ],
  };
  