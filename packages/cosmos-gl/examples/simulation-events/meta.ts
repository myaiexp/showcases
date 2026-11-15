// cosmos-gl example: Simulation events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Simulation events',
  summary:
    'onSimulationStart, onSimulationTick, onSimulationEnd, onSimulationPause and onSimulationUnpause report the layout run. The log shows each one, with the falling alpha value on every 25th tick, as start(), pause(), unpause() and stop() are called.',
  section: 'Event callbacks',
  tags: ['onSimulationStart', 'onSimulationTick', 'onSimulationEnd', 'onSimulationPause', 'onSimulationUnpause', 'start', 'pause', 'unpause', 'stop'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
