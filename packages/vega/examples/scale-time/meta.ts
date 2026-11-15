// vega example: Time Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Time Scale",
  summary:
    "MSFT closing prices on a time scale, with the start of the date domain driven by a signal. The axis re-picks month and year ticks as the window narrows.",
  section: "Scales",
  tags: ['scale.type','scale.domain','data.format.parse'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
