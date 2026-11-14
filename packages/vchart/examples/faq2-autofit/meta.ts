// vchart example: FAQ: why a chart stops following its container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: why a chart stops following its container",
  summary:
    "autoFit follows the container size by default. A width or height written in the spec, or autoFit: false, freezes the chart. The container narrows and widens on a timer; pick a setup to see which ones follow.",
  section: 'FAQ',
  tags: ['autoFit','width','height','resize'],
  docs: [
    'repo/docs/assets/faq/en/139-How to configure chart adaptive container width and height.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
