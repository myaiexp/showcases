// Sigma.js example: logging node and stage events
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Interaction event log',
  summary:
    'Every node and stage event sigma emits (enter, leave, down, up, click, right-click, double-click) printed with its payload into a scrolling panel over the graph.',
  section: 'Adding interactivity',
  tags: ['events', 'renderer.on', 'enterNode', 'clickStage'],
  docs: [`${DOCS}/how-to/interactivity/interactions-events.mdx`, `${DOCS}/reference/events.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
