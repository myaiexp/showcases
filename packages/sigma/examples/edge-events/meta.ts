// Sigma.js example: edge hover and click events
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Edge hover and click events',
  summary:
    'enableEdgeEvents turns on edge picking. Hovering an edge reports its two ends, and clicking toggles its highlighted state, which a conditional style paints.',
  section: 'Adding interactivity',
  tags: ['enableEdgeEvents', 'enterEdge', 'clickEdge', 'state'],
  docs: [
    `${DOCS}/how-to/interactivity/interactions-events.mdx`,
    `${DOCS}/reference/events.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/settings.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
