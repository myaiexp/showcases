// galacean example: Shadow types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow types",
  summary:
    "The four ShadowType values on one light: None, Hard, SoftLow and SoftHigh. Hard edges are sharp and cheap; the soft types blur the edge at growing cost.",
  section: "Light",
  tags: ['Light.shadowType', 'ShadowType'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
