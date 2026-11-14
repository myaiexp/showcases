// Tippy.js example: a filter dropdown that notices clicks outside it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Noticing clicks outside',
  summary:
    'A filter dropdown that does not close when you click elsewhere. It notices the click, counts it and flashes "Apply or Cancel?", so a half-made choice is not thrown away by accident.',
  section: 'Props: lifecycle hooks',
  tags: ['onClickOutside', 'hideOnClick: false', 'interactive', 'trigger: click'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/html-content.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
