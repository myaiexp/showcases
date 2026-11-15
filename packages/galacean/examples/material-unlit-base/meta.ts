// galacean example: Unlit base colour and texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Unlit base colour and texture",
  summary: "UnlitMaterial needs only a colour or texture: baseColor times baseTexture is the final colour, with no shading at all even under a light. Five tints share one painted texture.",
  section: "Material",
  tags: ['UnlitMaterial','baseColor','baseTexture'],
  docs: [
    'repo/docs/en/graphics/material/builtinShaders/unlit.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
