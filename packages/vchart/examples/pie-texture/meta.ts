// vchart example: Pie texture fills
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie texture fills",
  summary:
    "pie.style.texture takes a function of the datum and gives each sector a pattern; textureColor, textureSize and texturePadding tune it, and the legend shapes reuse the same textures. Sliders change the size and padding.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'texture', 'textureColor', 'textureSize', 'texturePadding'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
