// Layout example: swapAt overrides and the children setting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout swapAt mid-transition state',
  summary: 'Text inside animated items does not animate, it swaps at 50% progress. swapAt decides how it looks at that moment: faded and blurred, or not faded at all.',
  section: 'Layout',
  tags: ['createLayout', 'swapAt', 'children', 'layout.update', 'duration'],
  docs: [
    'pages/animejs-com/documentation/layout/states-parameters/swapAt.md',
    'pages/animejs-com/documentation/layout/states-parameters.md',
    'pages/animejs-com/documentation/layout/layout-settings/children.md',
    'pages/animejs-com/documentation/layout/layout-settings/duration.md',
    'pages/animejs-com/documentation/layout/common-auto-layout-gotchas.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
