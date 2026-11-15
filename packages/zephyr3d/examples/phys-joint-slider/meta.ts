// zephyr3d example: Slider joint: a drawer on a rail
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Slider joint: a drawer on a rail',
  summary:
    'A slider joint allows motion along the joint node\'s axis only, with limits in metres. A position motor pulls the drawer open and shut, and joint.position reads where it is.',
  section: 'Physics',
  tags: ['Joint', 'slider', 'axis', 'limitsEnabled', 'position', 'motorMode'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
