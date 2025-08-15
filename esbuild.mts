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

// Build test/ code
const testBuild = esbuild.build({
  entryPoints: ["test/**"],
  outdir: "node_modules/.tmp/test/",
  bundle: false,
  format: "cjs", // Either Mocha, VSCode test CLI, or both, doesn't support ESM.
  minify: false,
  sourcemap: true,
  sourcesContent: true,
  platform: "node",
});

await Promise.all([srcBuild, testBuild]);
