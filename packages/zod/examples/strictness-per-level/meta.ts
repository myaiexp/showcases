// Zod example: strip, strict and loose objects nested inside each other
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Strictness is set per object",
  summary:
    "z.looseObject() on the outside does not loosen the objects inside it, and z.strictObject() does not tighten them either. Each level keeps its own rule, so the same extra keys are kept, dropped or rejected depending on where they sit.",
  section: 'Objects',
  tags: ['z.object', 'z.strictObject', 'z.looseObject'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
