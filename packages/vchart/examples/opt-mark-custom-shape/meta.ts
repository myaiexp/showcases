// vchart example: Mark customShape: bars drawn as your own path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mark customShape: bars drawn as your own path",
  summary:
    "Every mark accepts customShape, a callback that draws the element with path commands relative to its top-left corner. The bars become pyramids, waves or arrows, and the data still drives their size.",
  section: "Option: Marks and Graphics",
  tags: ["customShape","ICustomPath2D","moveTo","quadraticCurveTo","lineTo"],
  docs: [
        'repo/docs/assets/option/en/mark/common-mark.md',
    'repo/docs/assets/option/en/mark/rect.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
