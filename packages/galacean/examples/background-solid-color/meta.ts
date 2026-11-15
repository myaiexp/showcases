// galacean example: Solid colour background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Solid colour background",
  summary:
    "scene.background in SolidColor mode fills the canvas with one colour before the camera renders; the card cycles through colours with solidColor.set, the full view has a colour picker.",
  section: "Background",
  tags: ['Background', 'BackgroundMode.SolidColor', 'solidColor'],
  docs: [
    'repo/docs/en/graphics/background/solidColor.mdx',
    'repo/docs/en/graphics/background/background.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
