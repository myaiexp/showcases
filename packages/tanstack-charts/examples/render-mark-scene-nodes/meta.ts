// tanstack-charts example: Every scene node kind
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Every scene node kind",
  summary:
    "One custom mark that emits all seven scene node kinds: a clipped and translated group, a rule, a polyline, an area, a dot, a rect and a label. The readout counts them in the compiled scene. Nodes are plain keyed objects, so any renderer can paint them.",
  section: "Custom Marks and Renderers",
  tags: ['createMark', 'SceneNode', 'group', 'rule', 'polyline', 'area', 'dot', 'rect', 'label', 'clip'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/runtime-and-scene.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
