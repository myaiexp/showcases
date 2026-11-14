// Tippy.js example: explaining why a disabled button is disabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Explaining a disabled button',
  summary:
    'A disabled button ignores the mouse, so a tip on it never appears. Wrap it in a span and put the tip on the wrapper: the form can now tell people why Submit is greyed out, and the tip switches off once they tick the box.',
  section: 'Constructor',
  tags: ['disabled', 'wrapper element', 'tabindex', 'enable()', 'disable()'],
  docs: ['repo/website/src/pages/v6/constructor.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
