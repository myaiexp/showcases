// echarts example: Security
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Security: escaping untrusted text in a tooltip',
  summary:
    'A tooltip.formatter that builds HTML from category names a user typed. Hover a bar to see markup in the name either break the tooltip or show as plain text once it goes through echarts.format.encodeHTML. A string template needs no escaping.',
  section: 'Best Practices',
  tags: ['tooltip.formatter', 'echarts.format.encodeHTML', 'tooltip.renderMode', 'tooltip.extraCssText'],
  docs: [
    'repo/contents/en/best-practices/security.md',
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
