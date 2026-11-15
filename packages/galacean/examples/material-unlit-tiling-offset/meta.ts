// galacean example: Unlit tiling and offset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Unlit tiling and offset",
  summary: "An unlit quad scrolls and repeats its texture through the tilingOffset Vector4: the scale x and y breathe while the offset z runs.",
  section: "Material",
  tags: ['UnlitMaterial','tilingOffset'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/unlit.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
