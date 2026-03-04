module.exports = {
  apps: [
    {
      name: "club-ai-api-gateway",
      script: "./src/index.js",
      watch: false,
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" },
    },
  ],
};
