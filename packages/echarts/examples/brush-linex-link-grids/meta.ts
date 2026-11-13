// echarts example: Brush lineX linked across two grids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brush lineX linked across two grids',
  summary:
    'Brush a range of days on the temperature line and the same days light up in the sales bars below, through brushLink and inBrush/outOfBrush. Switch lineX and rect, single and multiple, turn the link off, and tune the throttle.',
  section: 'Option: Components',
  tags: ['brush', 'brushLink', 'lineX', 'brushMode', 'throttleType', 'throttleDelay', 'inBrush', 'outOfBrush', 'takeGlobalCursor'],
  docs: ['repo/en/option/component/brush.md', 'repo/en/api/action.md', 'repo/en/api/events.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
