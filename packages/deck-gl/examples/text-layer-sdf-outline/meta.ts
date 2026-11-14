// deck-gl example: TextLayer SDF and outline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer SDF and outline',
  summary:
    'fontSettings sdf draws the glyph atlas as signed distance fields, which keeps edges sharp at any size and turns on outlineWidth and outlineColor; cutoff makes the letters thinner or thicker.',
  section: 'Core layers',
  tags: ['TextLayer', 'fontSettings', 'sdf', 'outlineWidth', 'outlineColor', 'cutoff'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
