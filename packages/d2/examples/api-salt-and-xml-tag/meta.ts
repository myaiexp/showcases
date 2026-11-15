// d2 example: Salt and noXMLTag for embedding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Salt and noXMLTag for embedding",
  summary:
    "Rendering the same diagram twice gives the same ID prefix, which clashes when both SVGs sit in one HTML page; `salt` changes the prefix. `noXMLTag: true` drops the `<?xml …?>` line for embedding the SVG straight into HTML.",
  section: "D2.js API",
  tags: ["salt", "noXMLTag", "svg", "render"],
  docs: [
    "repo/d2js/js/README.md",
    "repo/docs/tour/exports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
