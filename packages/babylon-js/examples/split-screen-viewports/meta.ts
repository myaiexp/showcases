// babylon-js example: split-screen camera viewports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Split-screen camera viewports',
  summary:
    'An orbiting ArcRotateCamera and a top-down UniversalCamera are both pushed into scene.activeCameras and given complementary Viewports. A slider moves the split and a button stacks the views instead of putting them side by side.',
  section: 'Cameras',
  tags: ['scene.activeCameras', 'Viewport', 'ArcRotateCamera', 'UniversalCamera'],
  docs: [
    'repo/content/features/featuresDeepDive/cameras/multiViewsPart2.md',
    'repo/content/features/featuresDeepDive/cameras/camera_introduction.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
