// echarts example: Tooltip formatter, valueFormatter and order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip formatter, valueFormatter and order',
  summary:
    'One axis tooltip with three ways to write its content: the default layout with a valueFormatter, a string template, and a callback returning escaped HTML with little bars. Change the content mode and the series order.',
  section: 'Option: Components',
  tags: ['tooltip', 'formatter', 'valueFormatter', 'order', 'encodeHTML', 'trigger'],
  docs: [
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/contents/en/basics/release-note/5-3-0.md',
    'repo/contents/en/basics/release-note/5-5-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
