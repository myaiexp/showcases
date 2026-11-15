// galacean example: Basics: 2D sprite benchmark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Basics: 2D sprite benchmark",
  summary:
    "The 2D scenario in miniature: hundreds of SpriteRenderers sharing one generated Sprite, all rotating each frame, with a frame-time readout and (in the full view) a slider for how many.",
  section: "Basics",
  tags: ['SpriteRenderer', 'Sprite', 'Texture2D', 'Time'],
  docs: [
    'repo/docs/en/basics/benchmark.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
