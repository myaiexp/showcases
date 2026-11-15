// vega example: domainRaw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "domainRaw",
  summary:
    "A sine-like series whose x domain starts from the data. Switching on the raw domain makes a signal array take over, so the two sliders pan and zoom the same scale.",
  section: "Scales",
  tags: ['scale.domainRaw','scale.domain.data','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
