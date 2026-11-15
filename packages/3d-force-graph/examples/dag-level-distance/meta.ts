// 3d-force-graph example: Force engine: dagLevelDistance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Force engine: dagLevelDistance",
  summary:
    "With dagMode on, dagLevelDistance is the gap between one level and the next. The slider changes it live; left unset, the library derives it from the number of nodes.",
  section: "Force engine configuration",
  tags: ['dagLevelDistance', 'dagMode'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
