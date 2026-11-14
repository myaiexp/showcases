// vchart example: Tooltip fixed position and positionMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip fixed position and positionMode',
  summary:
    'A mark tooltip fixed to an orientation (top, bottom, tl, center ...) relative to the bar, the pointer or the crosshair, with a pixel offset. The selects set position.x / y.orient, positionMode and offset.',
  section: 'Concepts: Components',
  tags: ['tooltip.mark.position', 'positionMode', 'orient', 'offset', 'crosshair'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Tooltip.md',
    'repo/docs/assets/option/en/component/tooltip.md',
    'repo/docs/assets/option/en/component/tooltip-common/tooltip-pattern.md',
    'repo/docs/assets/option/en/component/tooltip-common/tooltip-position-fixed.md',
    'repo/docs/assets/option/en/component/tooltip-common/tooltip-position-fixed-type.md',
    'repo/docs/assets/option/en/component/tooltip-common/tooltip-position-fixed-mode.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
