// vchart example: Morph animation: pie to bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Morph animation: pie to bar",
  summary:
    "updateSpec between a donut pie and a bar spec with the same data morphs one shape into the other. The third argument, a morph config, sets the transition's duration and easing; sliders in the full view change them.",
  section: 'Animation',
  tags: ['updateSpec', 'morph', 'IMorphConfig', 'morphConfig.animation'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Types.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
