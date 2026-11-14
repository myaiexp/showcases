// motion example: Page intro mixing a heading and 3D blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Page intro mixing a heading and 3D blocks",
  summary: "A landing-page intro in one sequence: the heading fades in, then a row of 3D blocks rises and turns one after another while a light fades up. DOM elements and Three.js objects share one animate() call.",
  section: "Integrations",
  tags: ["animate","sequence","stagger","at","threeEffect"],
  docs: ["pages/motion-dev/docs/three.md","pages/motion-dev/docs/timeline-sequences.md","pages/motion-dev/docs/stagger.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
