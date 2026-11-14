// Tippy.js example: password rules that appear while a field has focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hints while you type',
  summary:
    'In a sign-up form the password rules slide in when you click or tab into the field and tick themselves off as you type. They go away when you leave. A tip can follow focus as well as the mouse.',
  section: 'Props: behaviour',
  tags: ['trigger: focus', 'hideOnClick: false', 'content: Element'],
  docs: [
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/faq.mdx',
    'repo/website/src/pages/index.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
