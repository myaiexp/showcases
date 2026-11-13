// mermaid example: acctitle and accdescr readout from the svg
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "accTitle and accDescr readout from the SVG",
  summary:
    "accTitle and accDescr add title and desc elements and ARIA attributes to the SVG; a readout reads them back from the rendered diagram.",
  section: "Accessibility",
  tags: ["accTitle","accDescr","aria","title","desc"],
  docs: ["repo/packages/mermaid/src/docs/config/accessibility.md"],
  provenance: 'pure',
  added: '2026-11-13',
});
