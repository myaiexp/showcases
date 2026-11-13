// babylon-js example: ArcRotateCamera behaviors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ArcRotateCamera behaviors',
  summary:
    'Turns on the three ArcRotateCamera behaviors with useAutoRotationBehavior, useBouncingBehavior and useFramingBehavior. The camera drifts round when idle, bounces off its radius limits, and framingBehavior.zoomOnMesh flies it to frame a chosen mesh.',
  section: 'Behaviors',
  tags: ['AutoRotationBehavior', 'BouncingBehavior', 'FramingBehavior', 'zoomOnMesh', 'idleRotationSpeed', 'ArcRotateCamera'],
  docs: ['repo/content/features/featuresDeepDive/behaviors/cameraBehaviors.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
