// Sigma.js example: @sigma/utils helpers for fitting the camera to nodes
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Fit the viewport to a cluster',
  summary:
    'fitViewportToNodes() from @sigma/utils animates the camera until a chosen group of nodes fills the view. getNodesInViewport() reports how many nodes are currently visible.',
  section: 'Adding interactivity',
  tags: ['@sigma/utils', 'fitViewportToNodes', 'getNodesInViewport', 'camera'],
  docs: [`${DOCS}/how-to/interactivity/camera-viewport.mdx`, 'repo/packages/utils/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
