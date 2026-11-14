// playcanvas example: CameraFrame dynamic sky
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame dynamic sky',
  summary:
    'DynamicSkyEffect replaces the sky of a camera with an analytic atmosphere: the sun elevation sets the time of day, stars and a moon take over below the horizon, clouds (flat or volumetric) drift with the wind, the directional light and the scene lighting follow the sky, and haze fades distant ground into the sky colour. A day and night cycle runs; the full view edits the sun, clouds, haze and stars.',
  section: 'Graphics: Post Effects',
  tags: ['DynamicSkyEffect', 'elevation', 'azimuth', 'light', 'cloudType', 'CLOUDTYPE_VOLUMETRIC', 'cloudCoverage', 'windSpeed', 'haze', 'starBrightness'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/dynamic-sky.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
