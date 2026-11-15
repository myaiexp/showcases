// vega example: Sequential Single-Hue Schemes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sequential Single-Hue Schemes",
  summary:
    "The ten single-hue schemes, from blues to greys, each sampled as a smooth ramp by a linear scale. The lit row steps through them, and the select picks one in the full view.",
  section: "Schemes",
  tags: ['scale.range.scheme','scale.type','signal.bind'],
  docs: ['repo/docs/docs/schemes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
