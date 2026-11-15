// d2 example: Which D2 version is running
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Which D2 version is running",
  summary:
    "`version()` reports the D2 compiler inside the WASM (v0.7.0-HEAD for D2.js 0.1.33) and `jsVersion()` the D2.js package itself. The answer is drawn as a two-shape diagram.",
  section: "D2.js API",
  tags: ["version", "jsVersion"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/docs/releases/0.7.0.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
