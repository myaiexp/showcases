// vchart example: Area: gradient fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: gradient fill',
  summary:
    'area.style.fill takes a linear gradient; stops with falling opacity fade the area into the background. A slider moves the lower stop\'s offset, which changes how far the fill reaches.',
  section: 'Line and Area',
  tags: ['area.style.fill', 'gradient', 'stops.opacity'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
