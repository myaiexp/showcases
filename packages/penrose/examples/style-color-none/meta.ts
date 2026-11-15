// penrose example: none() leaves out a fill or a stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'none() leaves out a fill or a stroke',
  summary:
    'The colour `none()` omits the fill or the stroke altogether, which is not the same as a fully transparent colour. The three circles sit over a dark stripe: one with `fillColor : none()` is an outline, one with `strokeColor : none()` is a plain disc and the last keeps both.',
  section: 'Style: Expressions',
  tags: ['color', 'none', 'fillColor', 'strokeColor', 'Circle'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
