// gsap example: Physics2DPlugin particle burst
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physics2D particle burst',
  summary:
    'Dots spray upward from one point, each with its own random velocity and angle, then fall under gravity and slow with friction. Sliders change gravity and friction for the next burst.',
  section: 'Physics',
  tags: ['Physics2DPlugin', 'physics2D', 'velocity', 'angle', 'gravity', 'friction'],
  docs: ['pages/gsap-com/docs/v3/Plugins/Physics2DPlugin.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
