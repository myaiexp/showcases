// Spark example: Readback running a per-splat proximity query on the GPU
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A GPU proximity query with Readback',
  summary:
    'A Readback runs a dyno reader once per splat: it measures the distance from the splat’s centre to a moving probe and returns an inside flag and a packed distance as bytes. The CPU scans the returned bytes for the count inside the probe and the nearest splat, which the red marker follows. Probe position and radius are uniforms.',
  section: 'Dyno Overview',
  tags: ['Readback', 'renderReadback', 'Rgba8Readback', 'readPackedSplat', 'dynoVec3', 'dyno.distance'],
  docs: ['repo/docs/docs/dyno-overview.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
