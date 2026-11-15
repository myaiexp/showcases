// d2 example: Compile a project of several files
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compile a project of several files",
  summary:
    "`compile({ fs, inputPath, options })` takes a map of file paths to D2 source, so files can import each other; `inputPath` picks the entry file. The same four files compile to the whole project, the frontend or the backend.",
  section: "D2.js API",
  tags: ["compile", "fs", "inputPath", "import"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/d2js/js/index.d.ts",
    "repo/docs/tour/imports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
