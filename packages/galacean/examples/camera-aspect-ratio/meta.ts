// galacean example: Overriding the aspect ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Overriding the aspect ratio",
  summary:
    "The camera normally takes its aspectRatio from the canvas. Forcing a different value stretches the picture; resetAspectRatio hands control back to the canvas size.",
  section: "Camera",
  tags: ['Camera', 'aspectRatio', 'resetAspectRatio'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
