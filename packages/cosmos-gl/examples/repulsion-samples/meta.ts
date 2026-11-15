// cosmos-gl example: Repulsion samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Repulsion samples',
  summary:
    'simulationRepulsionSamples fixes how many close-range samples each grid cell gets above 4,096 points. Cells with fewer points than that are repelled exactly, denser cells are sampled anew every tick, so a low count is cheap but noisy and a high one is steady but costs a render pass per sample.',
  section: 'Simulation forces',
  tags: ['simulationRepulsionSamples', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-10-21-nearfield-sample-count.md', 'repo/docs/many-body-force/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
