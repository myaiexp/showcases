// echarts example: Draggable axisPointer handle with snap and label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Draggable axisPointer handle with snap and label',
  summary:
    'A time axis whose axisPointer has a handle you drag, and a tooltip that follows only the handle. Toggle snap to jump between data points, switch the label formatter, and resize the handle.',
  section: 'Option: Components',
  tags: ['axisPointer', 'handle', 'snap', 'label.formatter', 'tooltip.triggerOn', 'alwaysShowContent', 'value'],
  docs: [
    'repo/en/option/component/axisPointer.md',
    'repo/en/option/partial/axisPointer-common.md',
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
