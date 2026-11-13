// Spark example: generators.staticBox flickering random splats in a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural static box',
  summary:
    'A cube of television-static splats from generators.staticBox: the box is sliced into cells and each cell redraws its splat at a random point every frame. Sliders set cells per axis, dotScale and opacity, and a checkbox swaps the position-as-RGB colours for one colour.',
  section: 'Procedural Splats',
  tags: ['generators', 'staticBox', 'cells', 'dotScale', 'SplatGenerator'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
