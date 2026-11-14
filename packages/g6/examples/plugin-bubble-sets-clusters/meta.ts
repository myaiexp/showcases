// g6 example: BubbleSets: one set per cluster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BubbleSets: one set per cluster',
  summary: "One bubble-sets plugin per data.cluster value, coloured to match, around a force-laid-out graph. Uses the cluster dataset in place of the docs' collection.json.",
  section: 'Plugin',
  tags: ['bubble-sets', 'members', 'labelText', 'labelBackgroundFill', 'cluster'],
  docs: ['repo/packages/site/docs/manual/plugin/BubbleSets.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
