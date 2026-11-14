// deck-gl example: BrushingExtension radius
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BrushingExtension radius',
  summary:
    'The BrushingExtension hides every object farther than brushingRadius meters from the pointer, on the GPU. A slider changes the radius and a check toggles brushingEnabled; the dim points show what is hidden.',
  section: 'Extensions',
  tags: ['BrushingExtension', 'brushingRadius', 'brushingEnabled', 'extensions'],
  docs: [
    'repo/docs/api-reference/extensions/brushing-extension.md',
    'repo/docs/api-reference/extensions/overview.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
