// Tippy.js example: a mini reply form that closes when focus tabs out of it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Closes when you tab away',
  summary:
    'A quick-reply form opens under a button. With the hideOnPopperBlur plugin it closes as soon as keyboard focus leaves it, so Tab never strands you with a form left hanging open.',
  section: 'Plugins',
  tags: ['plugins', 'hideOnPopperBlur', 'interactive', 'setProps()', 'onShown'],
  docs: ['repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
