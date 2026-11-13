// echarts example: Tooltip rendered as richText
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip rendered as richText',
  summary:
    'The same axis tooltip as an HTML box or as text painted inside the chart (renderMode richText). Switch the mode, the font size and extraCssText, which only the HTML box honours.',
  section: 'Option: Components',
  tags: ['tooltip', 'renderMode', 'richText', 'extraCssText', 'textStyle', 'padding'],
  docs: [
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/contents/en/best-practices/security.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
