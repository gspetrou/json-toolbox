import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "node_modules/.tmp/test/integ/**/*.test.js",
});
