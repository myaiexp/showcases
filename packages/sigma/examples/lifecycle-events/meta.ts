// Sigma.js example: counting lifecycle events
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Lifecycle events',
  summary:
    'beforeProcess, afterProcess, beforeRender, afterRender, beforeClear, afterClear and resize fire without payload as sigma works. A counter per event shows which actions re-process data and which only re-render.',
  section: 'Reference',
  tags: ['events', 'lifecycle', 'render', 'refresh'],
  docs: [`${DOCS}/reference/events.md`, `${DOCS}/reference/sigma-api.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
