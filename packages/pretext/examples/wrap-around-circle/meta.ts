// Pretext example: wrap text around a moving circle with layoutNextLine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wrap around a moving circle',
  summary:
    'A row beside a circle has two free intervals. Each gets one layoutNextLine call at its own width, and the end cursor carries into the next interval. The circle drifts by itself and follows the pointer in the full view.',
  section: 'Manual line layout',
  tags: ['layoutNextLine', 'cursor', 'obstacle', 'animation'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
