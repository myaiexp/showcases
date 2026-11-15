// zephyr3d example: Physical camera lens and sensor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physical camera lens and sensor',
  summary:
    'camera.projectionMode = \'physical\' derives the field of view from focalLengthMm and the sensor size (sensorWidthMm, sensorHeightMm), with sensorFit choosing which sensor dimension drives it. The lens model is independent of the exposure model.',
  section: 'Lighting',
  tags: ['camera.projectionMode', 'focalLengthMm', 'sensorWidthMm', 'sensorHeightMm', 'sensorFit', 'effectiveFovY', 'scene.lightingMode'],
  docs: ['repo/apps/doc/web/en/lighting-physical.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
