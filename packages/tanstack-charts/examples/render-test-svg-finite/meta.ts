// tanstack-charts example: Structural checks on serialized SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Structural checks on serialized SVG",
  summary:
    "Serialized SVG is tested by structure instead of by string snapshot: parse it and check the root role, the accessible name, the element kinds present and that no number in it is NaN or Infinity. A custom mark that can emit non-finite geometry is switched on by a checkbox, and the finite check is the one that fails.",
  section: "Testing and Debugging",
  tags: ['renderChartSvg', 'DOMParser', 'NaN check', 'createMark', 'aria-label'],
  docs: [
    'repo/docs/guides/testing-and-debugging.md',
    'repo/docs/guides/custom-marks-and-renderers.md',
    'repo/docs/reference/scales-guides-and-color.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
