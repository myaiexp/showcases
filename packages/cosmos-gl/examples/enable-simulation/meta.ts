// cosmos-gl example: Enable simulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Enable simulation',
  summary:
    'With enableSimulation false the graph is drawn exactly where you put the points and nothing moves. Switching it on with setConfigPartial lets the forces take over, and switching it off freezes the layout again where it is.',
  section: 'Simulation control',
  tags: ['enableSimulation', 'setConfigPartial', 'rescalePositions'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-04-22-gpu-transitions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
