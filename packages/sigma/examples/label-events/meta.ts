// Sigma.js example: label hit-testing modes and the events they produce
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Clickable labels',
  summary:
    'nodeLabelEvents decides what a hit on a node label does: nothing, count as the node ("extend"), or fire dedicated label events ("separate"). Switch modes and watch which events increment, and which of isHovered or isLabelHovered lights up.',
  section: 'Reference',
  tags: ['labels', 'nodeLabelEvents', 'events', 'isLabelHovered'],
  docs: [
    `${DOCS}/reference/events.md`,
    `${DOCS}/reference/settings.md`,
    `${DOCS}/reference/state-flags.md`,
    `${DOCS}/reference/style-value-types.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
