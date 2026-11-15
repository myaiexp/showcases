// force-graph example: Force engine: dagLevelDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: dagLevelDistance',
  summary:
    'With dagMode on, dagLevelDistance is the gap between one depth and the next; left alone it is derived from the number of nodes. The slider and the card change it live.',
  section: 'Force engine configuration',
  tags: ['dagLevelDistance', 'dagMode'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
