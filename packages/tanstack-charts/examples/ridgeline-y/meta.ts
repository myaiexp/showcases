// tanstack-charts example: Ridgeline of rating profiles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ridgeline of rating profiles',
  summary:
    'ridgelineY draws prepared profiles as horizontal curves above categorical baselines. The profiles here are binX histograms scaled by normalize so each season peaks at 1, and the y axis is a reversed point scale so S1 sits at the bottom. Hover for a profile sample.',
  section: 'Ridgeline Marks',
  tags: ['ridgelineY', 'binX', 'normalize', 'scalePoint', 'reverse'],
  docs: ['repo/docs/reference/marks/ridgeline.md', 'repo/docs/guides/tooltips-and-focus.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
