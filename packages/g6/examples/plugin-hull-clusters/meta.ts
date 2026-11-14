// g6 example: Hull: one hull per cluster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hull: one hull per cluster',
  summary: "One hull plugin per data.cluster value, each with its own colour and a label with a background, around a force-laid-out graph. Uses the cluster dataset in place of the docs' collection.json.",
  section: 'Plugin',
  tags: ['hull', 'members', 'labelText', 'labelBackgroundFill', 'cluster'],
  docs: ['repo/packages/site/docs/manual/plugin/Hull.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
