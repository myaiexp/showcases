// AntV Infographic example: Resources: illustrations as canvas-drawn base64 images
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resources: illustrations as canvas-drawn base64 images',
  summary:
    "Templates that use illustrations leave the pictures to the app. Here each item's illus is a base64 PNG data URI drawn on a canvas in code, with a different scene per step, and the built-in data URI protocol needs no loader.",
  section: 'Resources',
  tags: ['illus', 'data:image/png;base64', 'canvas', 'list-row-simple-illus', 'sequence-steps-simple-illus'],
  docs: [
    'repo/site/src/content/learn/resources.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
