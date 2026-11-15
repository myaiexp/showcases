// cosmos-gl example: Quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start',
  summary:
    'The graph from the Quick Start: three points given as a flat [x, y, …] Float32Array, three links as pairs of point indices, and the config the docs open with (low friction, no gravity, curved links, a delayed fit, draggable points and click callbacks). render() applies the data and the layout starts on its own.',
  section: 'Quick start',
  tags: ['Graph', 'setPointPositions', 'setLinks', 'render', 'onPointClick', 'onBackgroundClick'],
  docs: ['repo/src/stories/welcome.mdx', 'repo/README.md', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
