// Sigma.js example: toggling settings on a running renderer
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Changing settings at runtime',
  summary:
    'setSetting() flips one option and setSettings() changes several in a single refresh, here for labels, edge hiding, zoom and pan switches and the camera ratio limits. The log shows the call behind each control.',
  section: 'Adding interactivity',
  tags: ['settings', 'setSetting', 'setSettings', 'camera'],
  docs: [
    `${DOCS}/how-to/interactivity/camera-viewport.mdx`,
    `${DOCS}/reference/settings.md`,
    `${DOCS}/reference/sigma-api.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
