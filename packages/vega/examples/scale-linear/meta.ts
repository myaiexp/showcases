// vega example: Linear Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Linear Scale",
  summary:
    "A linear scale maps values to pixels proportionally. The domain maximum is a signal that slides between 100 and 250, so every bar shrinks by the same factor.",
  section: "Scales",
  tags: ['scale.type','scale.domain','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
