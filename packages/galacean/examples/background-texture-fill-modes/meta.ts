// galacean example: Texture background fill modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Texture background fill modes",
  summary:
    "A wide painted texture as the scene background, drawn with each BackgroundTextureFillMode in turn: AspectFitWidth, AspectFitHeight and Fill. The card cycles, the full view has a select.",
  section: "Background",
  tags: ['Background', 'BackgroundMode.Texture', 'texture', 'BackgroundTextureFillMode'],
  docs: [
    'repo/docs/en/graphics/background/texture.mdx',
    'repo/docs/en/graphics/background/background.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
