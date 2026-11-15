// globe-gl example: Custom layer: update in place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layer: update in place",
  summary:
    "customThreeObjectUpdate moves probes on each data update instead of rebuilding them; the full view counts objects created against updates.",
  section: "Custom Layer",
  tags: ['customThreeObjectUpdate', 'customThreeObject', 'customLayerData', 'getCoords'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
