// galacean example: The three background modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The three background modes",
  summary:
    "One scene whose background.mode steps through SolidColor, Texture and Sky: the three kinds of background the docs list.",
  section: "Background",
  tags: ['Background', 'BackgroundMode', 'SkyProceduralMaterial', 'texture', 'solidColor'],
  docs: [
    'repo/docs/en/graphics/background/background.mdx',
    'repo/docs/en/graphics/background/solidColor.mdx',
    'repo/docs/en/graphics/background/texture.mdx',
    'repo/docs/en/graphics/background/sky.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
