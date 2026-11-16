// fabric example: Extensions: linear gradient controls
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: linear gradient controls',
  summary:
    "createLinearGradientControls(gradient) returns controls for a Rect's fill: two end handles edit the gradient coords and one dot per colour stop edits its offset. The gradient JSON updates as you drag.",
  section: 'Extensions',
  tags: ['createLinearGradientControls', 'Gradient', 'coords', 'colorStops', 'controls'],
  docs: [
    'repo/extensions/README.MD',
    'repo/CHANGELOG.md',
    'repo/src/content/docs/api/classes/Gradient.md',
    'repo/src/content/docs/api/classes/Control.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
