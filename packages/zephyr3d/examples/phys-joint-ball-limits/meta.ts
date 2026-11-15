// zephyr3d example: Ball joint limits: swing and twist
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ball joint limits: swing and twist',
  summary:
    'A post stands on a ball joint at its foot, pushed round in a circle and twisted. swingLimit caps the tilt away from the joint axis and twistLimit the turn about it, both in degrees each way.',
  section: 'Physics',
  tags: ['Joint', 'ball', 'swingLimit', 'twistLimit', 'limitsEnabled'],
  docs: ['repo/apps/doc/web/en/physics-joints.md', 'repo/apps/doc/src/tut-79/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
