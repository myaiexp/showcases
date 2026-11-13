// Pretext example: predict a paragraph's height with prepare() and layout()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Height without the DOM',
  summary:
    'prepare() measures the text once; layout() then gives the height at any width with pure arithmetic. A dashed box shows the prediction under the painted paragraph, and the full view checks it against the DOM.',
  section: 'Measure height',
  tags: ['prepare', 'layout', 'height', 'resize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
