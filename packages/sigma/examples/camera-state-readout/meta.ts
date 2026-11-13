// Sigma.js example: reading the camera state from its events
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Live camera state',
  summary:
    'The camera exposes x, y, ratio and angle, and emits "updated" whenever they change. A readout follows it while you pan, zoom or rotate, and animationStart/animationEnd report whether a move completed.',
  section: 'Reference',
  tags: ['camera', 'events', 'rotation', 'updateState'],
  docs: [`${DOCS}/reference/camera-api.md`, `${DOCS}/reference/events.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
