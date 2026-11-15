// cosmos-gl example: All forces together
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'All forces together',
  summary:
    'Sliders for gravity, centering, repulsion, link spring, link distance, friction and collision on one graph of four communities, plus presets that set several at once. Every change is a single setConfigPartial call followed by start().',
  section: 'Simulation forces',
  tags: ['setConfigPartial', 'simulationGravity', 'simulationCenter', 'simulationRepulsion', 'simulationLinkSpring', 'simulationLinkDistance', 'simulationFriction', 'simulationCollision'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
