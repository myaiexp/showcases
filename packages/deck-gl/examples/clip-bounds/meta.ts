// deck-gl example: ClipExtension bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ClipExtension bounds',
  summary:
    'clipBounds cuts a layer to a [left, bottom, right, top] rectangle in longitude and latitude. Four sliders move the edges over a country layer, with the full map faint beneath.',
  section: 'Extensions',
  tags: ['ClipExtension', 'clipBounds', 'GeoJsonLayer'],
  docs: [
    'repo/docs/api-reference/extensions/clip-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
