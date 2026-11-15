// tanstack-charts example: compositeMark groups a frame and dots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "compositeMark groups a frame and dots",
  summary:
    "compositeMark bundles a frame and a dot mark behind one id. The parent namespaces its children's scene keys and mark ids, which the readout shows from the compiled scene, and each child dot stays a separate focus target.",
  section: "Custom Marks and Renderers",
  tags: ['compositeMark', 'frame', 'dot', 'tooltip'],
  docs: ['repo/docs/guides/custom-marks-and-renderers.md', 'repo/docs/reference/custom-extensions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
