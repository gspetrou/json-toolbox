import * as esbuild from "esbuild";

// Build src/ code
const srcBuild = esbuild.build({
  entryPoints: ["src/extension.ts"],
  outfile: "dist/extension.cjs",
  bundle: true,
  format: "cjs", // VSCode extensions do not support ESM.
  minify: true,
  sourcemap: false,
  sourcesContent: false,
  platform: "node",
  external: ["vscode"],
});

// Build test/integ/ code
const integTestBuild = esbuild.build({
  entryPoints: ["test/common/**/*.ts", "test/integ/**/*.ts"],
  outdir: "node_modules/.tmp/test",
  bundle: false,
  format: "cjs", // Mocha and VSCode test CLI do not support ESM.
  minify: false,
  sourcemap: true,
  sourcesContent: true,
  platform: "node",
});

await Promise.all([srcBuild, integTestBuild]);
