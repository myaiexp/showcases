// Chart.js example: A crosshair from plugin events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A crosshair from plugin events',
  summary:
    "A plugin's afterEvent hook records the pointer and sets args.changed; afterDraw paints dashed lines and reads the value under them with getValueForPixel().",
  section: 'Developers',
  tags: ['plugin', 'afterEvent', 'crosshair', 'getValueForPixel'],
  docs: ['repo/docs/developers/plugins.md', 'repo/docs/developers/axes.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
