// echarts example: Graphic transition all and per-phase animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Graphic transition all and per-phase animation',
  summary:
    'Nine squares drawn by the graphic component, matched by id. Changing the layout moves, resizes, rotates and recolours them with transition all; limit transition to x and y, or turn it off, to see only part of the change animate. Removing squares plays their leave animation.',
  section: 'Option: Components',
  tags: ['graphic', 'transition', 'enterFrom', 'leaveTo', 'enterAnimation', 'updateAnimation', 'leaveAnimation', '$action'],
  docs: [
    'repo/en/option/component/graphic.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
