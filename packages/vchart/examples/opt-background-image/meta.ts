// vchart example: Chart background: an image with mode, position and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart background: an image with mode, position and scale",
  summary:
    "The background option also takes an image configuration. A canvas-drawn picture, passed as a data URL, is tiled or fitted with backgroundMode, anchored with backgroundPosition and sized with backgroundScale.",
  section: "Option: Common",
  tags: ["background","image","backgroundMode","backgroundPosition","backgroundScale","backgroundOpacity"],
  docs: [
    'repo/docs/assets/option/en/common/background.md',
    'repo/docs/assets/option/en/common/chart-spec.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
