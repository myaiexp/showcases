// deck-gl example: TextLayer angle, offset and billboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer angle, offset and billboard',
  summary:
    'Labels rotated with getAngle, pushed away from their points with getPixelOffset, and switched between camera-facing and flat-on-the-ground with billboard in a tilted view.',
  section: 'Core layers',
  tags: ['TextLayer', 'getAngle', 'getPixelOffset', 'billboard', 'getTextAnchor'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
