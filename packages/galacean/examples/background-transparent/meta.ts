// galacean example: Transparent background over the page
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transparent background over the page",
  summary:
    "A solid colour of (0, 0, 0, 0) lets the page behind the canvas show through, as the docs note. A CSS gradient behind the canvas stands in for the page.",
  section: "Background",
  tags: ['Background.solidColor', 'isAlphaOutputRequired'],
  docs: [
    'repo/docs/en/graphics/background/solidColor.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
