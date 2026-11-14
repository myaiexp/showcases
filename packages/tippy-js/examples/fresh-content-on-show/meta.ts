// Tippy.js example: a "posted" tip whose text is recomputed every time it opens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Always up to date',
  summary:
    'Two "posted" labels carry a tip saying how long ago they were posted. One tip recalculates when it opens and stays right; the other was filled in once and goes stale. The page clock runs a minute per second so you can see it.',
  section: 'Props: lifecycle hooks',
  tags: ['onShow', 'setContent()'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
