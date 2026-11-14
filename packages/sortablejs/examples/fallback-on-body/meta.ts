// Sortable.js example: a floating copy that escapes a clipped panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Floating copy escapes its panel',
  summary:
    'A narrow queue panel that hides anything sticking out of it. Drag a track toward the page and, with fallbackOnBody on, the copy you carry floats freely instead of being cut off.',
  section: 'Fallback mode',
  tags: ['fallbackOnBody', 'forceFallback', 'Sortable.ghost', 'onStart'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
