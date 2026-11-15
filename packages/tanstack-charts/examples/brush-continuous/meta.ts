// tanstack-charts example: A pointer-only brush on a numeric scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A pointer-only brush on a numeric scale',
  summary:
    'Number and Date brushes may omit values when keyboard is false, and the brush then uses scale inversion for a continuous range. There are no keyboard handles, so a real application pairs it with inputs. Here two sliders do that and write the same range.',
  section: 'Interactions and Selections',
  tags: ['brushX', 'keyboard', 'BrushXContinuousOptions', 'invert'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
