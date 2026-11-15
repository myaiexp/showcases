// cosmos-gl example: FPS monitor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FPS monitor',
  summary:
    'showFPSMonitor draws a small WebGL performance monitor over the graph. It is off by default and can be switched on and off at runtime with setConfigPartial.',
  section: 'Configuration',
  tags: ['showFPSMonitor', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
