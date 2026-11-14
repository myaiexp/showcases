// g6 example: Create edge: onCreate and onFinish
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Create edge: onCreate and onFinish',
  summary: "onCreate receives the new edge's data and returns the data to add, here with a numbered label; onFinish runs once it exists. The card creates labelled edges and clears them.",
  section: 'Behavior',
  tags: ['create-edge', 'onCreate', 'onFinish'],
  docs: ['repo/packages/site/docs/manual/behavior/CreateEdge.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
