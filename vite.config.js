const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: { setupFiles: ["./__tests__/setup.js"] }
});
