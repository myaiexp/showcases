// Sigma.js example: routing wheel and touch gestures between graph and page
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Sharing scroll gestures with the page',
  summary:
    'The gestureTarget setting decides whether wheel and touch gestures drive the graph, the page, or both (Ctrl + scroll). Switch it live and scroll over the stage.',
  section: 'Adding interactivity',
  tags: ['gestureTarget', 'wheel', 'touch', 'settings'],
  docs: [`${DOCS}/how-to/interactivity/interactions-events.mdx`, `${DOCS}/reference/settings.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
