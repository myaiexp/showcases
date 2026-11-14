// observable-plot example: Dodge: occlusion in dots and barcodes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: occlusion in dots and barcodes',
  summary:
    'Plain dotX and ruleX marks hide overlapping cars; adding dodgeY spreads the dots so every one shows.',
  section: 'Transform: Dodge',
  tags: ['dotX', 'ruleX', 'dodgeY', 'occlusion'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/cars.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
