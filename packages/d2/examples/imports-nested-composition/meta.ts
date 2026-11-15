// d2 example: Layers imported from their own files
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers imported from their own files",
  summary:
    "overview.d2 declares `layers: { serviceB: @serviceB }`, and serviceB.d2 does the same for data.d2, so each file stays flat while the boards nest. Links on serviceB and data open those layers; the card shows each board in turn by rendering it with `target`.",
  section: "Imports",
  tags: ["import", "layers", "link", "composition"],
  docs: [
    "repo/docs/tour/nested-composition.md",
    "repo/static/bespoke-d2/imports-nested.d2",
    "repo/static/bespoke-d2/serviceB.d2",
    "repo/static/bespoke-d2/data.d2",
    "repo/d2js/js/README.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
