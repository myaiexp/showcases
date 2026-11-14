// playcanvas example: Light estimation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light estimation',
  summary:
    "AR light estimation describes the real room's lighting: the most prominent directional light (rotation, intensity, colour) and ambient light as spherical harmonics. A simulated estimate sweeps a sun across the sky, warm at the horizon, and drives a light entity and the ambientSH of every material from the same Estimate shape that XrLightEstimation provides. Drag the time-of-day slider to scrub it. In an AR session the real estimate replaces the simulation once it becomes available.",
  section: 'XR',
  tags: ['XrLightEstimation', 'intensity', 'color', 'rotation', 'sphericalHarmonics', 'ambientSH', 'available'],
  docs: ['repo/docs/user-manual/xr/ar/light-estimation.md', 'repo/docs/user-manual/xr/ar/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
