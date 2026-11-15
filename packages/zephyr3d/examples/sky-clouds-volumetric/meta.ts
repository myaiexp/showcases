// zephyr3d example: Volumetric clouds and their WebGL2 fallback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Volumetric clouds and their WebGL2 fallback",
  summary:
    "Sets up the volumetric cloud layer (layerBottomAltitude, layerHeight, coverage, density, wind, framesPerUpdate, cacheResolution) and reads effectiveCloudMode back. Volumetric mode is WebGPU-only, so on WebGL2 the 2D clouds are drawn instead.",
  section: "Environment",
  tags: ['cloudMode', 'effectiveCloudMode', 'volumetricCloud', 'coverage', 'density', 'cloudDebugView'],
  docs: ['repo/apps/doc/web/en/sky.md', 'repo/apps/doc/src/tut-34/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
