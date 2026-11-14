// deck-gl example: TextLayer fontFamily and fontWeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer fontFamily and fontWeight',
  summary:
    'Switching fontFamily and fontWeight on the same city labels: the layer draws its glyph atlas with canvas fonts, so any installed system family works without loading a web font.',
  section: 'Core layers',
  tags: ['TextLayer', 'fontFamily', 'fontWeight'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
