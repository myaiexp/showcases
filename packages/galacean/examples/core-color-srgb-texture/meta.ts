// galacean example: Color: sRGB and linear textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Color: sRGB and linear textures",
  summary:
    "The same grayscale ramp uploaded as an sRGB colour texture and as a linear data texture (isSRGBColorSpace false). The engine decodes only the first, so the two look clearly different on unlit planes.",
  section: "Core",
  tags: ['Texture2D', 'isSRGBColorSpace', 'UnlitMaterial', 'baseTexture'],
  docs: [
    'repo/docs/en/core/color.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
