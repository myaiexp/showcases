// zephyr3d example: Character tuning: step height, slopes, pushing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Character tuning: step height, slopes, pushing',
  summary:
    'The controller\'s tuning properties on a course of 0.25 m steps, a 0.5 m ledge, a 25° and a 55° ramp and loose crates. Sliders change stepHeight, slopeLimit, slideSlope, snapToGround and pushBodies while you walk.',
  section: 'Physics',
  tags: ['CharacterController', 'stepHeight', 'slopeLimit', 'slideSlope', 'snapToGround', 'pushBodies'],
  docs: ['repo/apps/doc/web/en/physics-character.md', 'repo/apps/doc/src/tut-80/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
