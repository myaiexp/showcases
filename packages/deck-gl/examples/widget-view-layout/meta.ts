// deck-gl example: buildViewsFromViewLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'buildViewsFromViewLayout',
  summary:
    'An overlay ViewLayout puts a fixed-size minimap over a full-size map. buildViewsFromViewLayout turns it into concrete views for the current canvas size, and compiles again (reusing views) when the box resizes.',
  section: 'Widgets',
  tags: ['buildViewsFromViewLayout', 'ViewLayout', 'overlay', 'rectsById', 'previous', 'calc()'],
  docs: [
    'repo/docs/api-reference/widgets/view-layout.md',
    'repo/docs/api-reference/widgets/splitter-widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
