// d2 example: Import one object from a file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Import one object from a file",
  summary:
    "`...@people.management` imports only the management map of people.d2, so Joe and Jan appear and Toby from employees does not. Spreading the whole file brings Toby in too.",
  section: "Imports",
  tags: ["import", "partial", "person"],
  docs: [
    "repo/docs/tour/imports.md",
    "repo/static/d2/imports-targeted.d2",
    "repo/static/d2/people.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
