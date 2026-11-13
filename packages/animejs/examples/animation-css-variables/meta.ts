// Animation example: var(--name) values in animate() and waapi.animate()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSS variables as tween values',
  summary: 'Two rows of squares animated with var(--scale), var(--rotation) and colour variables, one row with animate() and one with waapi.animate(). The full view changes --scale and shows that restart() alone keeps the old value until refresh() is called.',
  section: 'Animation',
  tags: ['animate', 'waapi', 'CSS variables', 'refresh', 'stagger'],
  docs: ['pages/animejs-com/documentation/animation/tween-value-types/css-variable.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
