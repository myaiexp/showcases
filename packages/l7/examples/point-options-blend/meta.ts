// l7 example: Layer option: blend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer option: blend",
  summary:
    "blend decides what an overlap shows: normal keeps only the top layer, additive adds the colors, subtractive subtracts them and max keeps the larger channel. The orange layer is blended onto the blue one.",
  section: "Point Layer",
  tags: ['PointLayer', 'options', 'blend', 'additive', 'subtractive', 'max', 'setBlend'],
  docs: ['repo/site/docs/api/point_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md', 'repo/site/docs/api/common/layer/layer_update.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
