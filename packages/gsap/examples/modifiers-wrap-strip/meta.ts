// GSAP example: ModifiersPlugin wrapping a looping strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Modifiers: wrapping strip',
  summary:
    'Eight boxes loop endlessly along a strip with one tween: x runs relative "+=" the full length and a modifier folds every value back with modulus. Show overflow reveals boxes spilling past the edge just before they wrap.',
  section: 'Core plugins',
  tags: ['modifiers', 'unitize', 'relative values', 'repeat'],
  docs: ['pages/gsap-com/docs/v3/GSAP/CorePlugins/Modifiers.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
