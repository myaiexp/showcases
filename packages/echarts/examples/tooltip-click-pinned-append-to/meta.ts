// echarts example: Tooltip on click, pinned and appended elsewhere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip on click, pinned and appended elsewhere',
  summary:
    'A scatter inside a box that clips overflow. Choose what triggers the tooltip, pin it with alwaysShowContent, let the mouse enter it to press a button, and move it to document.body with appendTo so it is no longer clipped.',
  section: 'Option: Components',
  tags: ['tooltip', 'triggerOn', 'alwaysShowContent', 'enterable', 'appendTo', 'showTip'],
  docs: [
    'repo/en/option/component/tooltip.md',
    'repo/en/option/partial/tooltip-common.md',
    'repo/contents/en/basics/release-note/5-5-0.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
