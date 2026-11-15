// vega example: Image: Aspect Ratio and Smoothing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: Aspect Ratio and Smoothing",
  summary:
    "The same generated 100 by 60 image is drawn into the dashed box the signals give. With only a width, the height follows the picture; with both set, aspect fits the picture inside the box and no aspect stretches it to fill.",
  section: "Mark Types",
  tags: ['marks.image.url','marks.image.aspect','marks.image.smooth'],
  docs: ['repo/docs/docs/marks/image.md', 'repo/docs/docs/marks/image.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
