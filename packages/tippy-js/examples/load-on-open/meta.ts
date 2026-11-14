// Tippy.js example: Loading content when a tip opens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Loading content when it opens',
  summary:
    'The tip says "Loading..." and swaps in a freshly drawn picture a moment later. It resets when closed, and quick in-and-out hovers start only one load. The slow load is a stand-in: nothing is fetched.',
  section: 'AJAX',
  tags: ['onShow', 'onHidden', 'onCreate', 'setContent()', 'state.isVisible'],
  docs: ['repo/website/src/pages/v6/ajax.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
