// tanstack-charts example: Gradient legend steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradient legend steps',
  summary:
    'colorGradientLegend draws a numeric color domain as a sampled ramp. steps sets how many color samples are drawn, with a minimum of two, so two steps show a hard two-tone bar and 48 steps look smooth. width and the endpoint format are options too.',
  section: 'Legends and Color',
  tags: ['colorGradientLegend', 'steps', 'width', 'format'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
