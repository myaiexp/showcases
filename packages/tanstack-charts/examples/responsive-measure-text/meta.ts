// tanstack-charts example: Supplying measureText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Supplying measureText',
  summary:
    'A host measures painted text itself. Passing measureText replaces that with your own function, which runs synchronously during scene compilation. This one reports glyphs 0.8 or 1.3 times the usual width, and the automatic margins and tick thinning react to it.',
  section: 'Responsive Charts',
  tags: ['measureText', 'ChartTextMeasurer', 'margin'],
  docs: ['repo/docs/guides/responsive-charts.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
