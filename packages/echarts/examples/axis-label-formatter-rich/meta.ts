// echarts example: Axis label formatters and rich text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Axis label formatters and rich text',
  summary:
    'A time axis whose labels you can format five ways: default, a string template, cascading templates by granularity, and rich-text styled versions of the cascade and of a callback. Also rotate the labels and use a template on the value axis.',
  section: 'Option: Components',
  tags: ['axisLabel', 'formatter', 'rich', 'rotate', 'hideOverlap', 'xAxis type: time'],
  docs: [
    'repo/en/option/component/axis-common.md',
    'repo/en/option/component/x-axis.md',
    'repo/en/option/partial/text-style.md',
    'repo/en/option/partial/formatter.md',
    'repo/contents/en/concepts/axis.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
