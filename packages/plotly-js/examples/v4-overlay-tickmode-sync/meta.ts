// plotly-js example: v4: overlay axes sync their ticks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'v4: overlay axes sync their ticks',
  summary:
    "An overlaying y axis now defaults to tickmode 'sync', putting its ticks on the base axis's gridlines; tickmode 'auto' brings back v3's staggered grid.",
  section: "What's New in v4",
  tags: ['yaxis2.overlaying', 'tickmode: sync'],
  docs: ['repo/_posts/plotly_js/guides/whats-new-in-v4/2026-07-20-whats-new-in-v4.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
