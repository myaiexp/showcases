// deck-gl example: Per-feature minimum zoom with DataFilterExtension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-feature minimum zoom with DataFilterExtension',
  summary:
    "Each city carries the zoom at which it should appear, from its population rank. DataFilterExtension filters on that value against the current zoom on the GPU, so big cities show first and smaller ones fade in as you zoom.",
  section: 'Data and performance',
  tags: ['DataFilterExtension', 'getFilterValue', 'filterRange', 'filterSoftRange', 'TextLayer'],
  docs: [
    'repo/docs/developer-guide/zoom-dependent-layers.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
