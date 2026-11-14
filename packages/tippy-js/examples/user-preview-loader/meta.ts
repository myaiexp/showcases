// Tippy.js example: Previewing a user from an @mention
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Previewing a user',
  summary:
    'Hover an @mention in a chat and the tip says "Loading..." before a small profile fills in. Each profile is looked up once and then comes back instantly. The look-up is a stand-in: nothing is fetched.',
  section: 'AJAX',
  tags: ['onShow', 'onHidden', 'setContent()', 'content: Element', 'delay'],
  docs: ['repo/website/src/pages/v6/ajax.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
