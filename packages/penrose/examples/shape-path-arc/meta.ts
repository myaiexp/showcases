// penrose example: Path arc: largeArc and arcSweep
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Path arc: largeArc and arcSweep',
  summary:
    'Two fixed end points and one `arc("open", start, end, (rx, ry), rotation, largeArc, arcSweep)` call give four different arcs, one per combination of `largeArc` and `arcSweep` (0 or 1), each drawn on its own tab with the end points marked.',
  section: 'Shape: Path',
  tags: ['Path', 'd', 'arc', 'largeArc', 'arcSweep'],
  docs: ['repo/packages/docs-site/docs/ref/style/shapes/path.md', 'repo/packages/core/src/shapes/Path.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
