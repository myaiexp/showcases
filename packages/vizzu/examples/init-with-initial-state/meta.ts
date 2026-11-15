// Vizzu example: the constructor's second parameter draws the first state at once
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initial state in the constructor',
  summary:
    "The second constructor parameter describes the chart's first state (data, config and style), which Vizzu draws with no animation, so the chart is already complete when initializing resolves. Later animate() calls still animate from it.",
  section: 'Initialization',
  tags: ['Vizzu', 'initState', 'initializing'],
  docs: [
    'repo/src/apps/weblib/ts-api/vizzu.ts',
    'repo/docs/tutorial/initialization.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
