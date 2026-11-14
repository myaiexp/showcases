// deck-gl example: PathLayer antialiasing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer antialiasing',
  summary:
    'A translucent self-crossing path drawn with antialiasing on and off: shader-computed edge coverage smooths the sides but can leave artifacts where a path overlaps itself.',
  section: 'Core layers',
  tags: ['PathLayer', 'antialiasing', 'capRounded'],
  docs: [
    'repo/docs/api-reference/layers/path-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
