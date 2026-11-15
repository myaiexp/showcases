// d2 example: Zoom from components into code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Zoom from components into code",
  summary:
    "Two code diagrams (Go signatures as code labels) are imported as layers, and links on the matching components open them. The card renders the component view and then each code layer with `target`.",
  section: "C4",
  tags: ["layers", "link", "import", "code"],
  docs: [
    "repo/blog/c4.md",
    "repo/static/d2/c4-code1.d2",
    "repo/static/d2/c4-code2.d2",
    "repo/static/d2/c4-models.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
