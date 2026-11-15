// galacean example: Alpha output over the page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Alpha output over the page",
  summary:
    "With a transparent solid-colour background the canvas shows the page behind it. isAlphaOutputRequired on the Camera keeps the alpha channel in the output, here over a striped CSS backdrop.",
  section: "Camera",
  tags: ['Camera', 'isAlphaOutputRequired', 'enableHDR', 'Background.solidColor'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/background/solidColor.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
