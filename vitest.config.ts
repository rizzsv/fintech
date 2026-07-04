import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      "node_modules",
      "dist",

      "test/integration/ledger/**",
      "test/integration/transaction/**",
      "test/unit/transaction/**",
    ],
  },
});