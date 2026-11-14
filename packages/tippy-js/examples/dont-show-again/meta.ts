// Tippy.js example: a tip with a "don't show this again" link that destroys it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Don't show this again",
  summary:
    'A helpful tip on the Export button carries a "Don\'t show this again" link. Following it destroys the tip for good, while the button keeps working as before. Reset makes the tip once more.',
  section: 'Methods',
  tags: ['destroy()', 'interactive', 'tippy()'],
  docs: ['repo/website/src/pages/v6/methods.mdx', 'repo/website/src/pages/v6/html-content.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
