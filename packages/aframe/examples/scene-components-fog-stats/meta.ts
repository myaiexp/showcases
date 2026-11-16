// aframe example: Scene components: fog and stats on <a-scene>
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scene components: fog and stats on <a-scene>',
  summary:
    'Components can attach to the scene as well as entities. fog fades distant boxes into the background and can be switched between linear and exponential; stats toggles the performance overlay.',
  section: 'Core API',
  tags: ['fog', 'stats', 'scene component', 'setAttribute'],
  docs: ['repo/docs/core/scene.md', 'repo/docs/components/fog.md', 'repo/docs/components/stats.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
