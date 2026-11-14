// Tippy.js example: closing every open tip at once with hideAll()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Close all tips at once',
  summary:
    'A dashboard with several tips left open and a Hide all button that closes every one of them in a single call. Variants close them instantly, or keep one open. In the gallery card, the tips are closed one by one instead, because hideAll() reaches the whole page.',
  section: 'Methods',
  tags: ['hideAll()', 'duration', 'exclude', 'trigger: manual'],
  docs: ['repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
