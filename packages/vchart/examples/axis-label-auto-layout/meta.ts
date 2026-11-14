// vchart example: autoHide, autoRotate and autoLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'autoHide, autoRotate and autoLimit',
  summary:
    'With sampling off, the axis component can lay labels out itself: autoHide drops colliding labels, autoRotate tilts them through 0, 45 and 90 degrees, and autoLimit truncates long ones with an ellipsis once the axis hits its maxWidth. Each has its own switch.',
  section: 'Concepts: Axes',
  tags: ['label.autoHide', 'label.autoRotate', 'label.autoLimit', 'limitEllipsis', 'sampling: false', 'maxWidth'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/cartesian-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
