// Tippy.js example: a focus hint that survives clicking into the field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A hint that does not vanish on click',
  summary:
    'Two username fields show a hint when focused. On the left, clicking into the field makes the hint disappear the moment it appears. On the right, hideOnClick is turned off, so the hint stays while you type.',
  section: 'FAQ',
  tags: ['trigger: focus', 'hideOnClick', 'tippy()'],
  docs: ['repo/website/src/pages/v6/faq.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
