// babylon-js example: Photo dome from a generated panorama
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Photo dome from a generated panorama',
  summary:
    'A PhotoDome wraps an equirectangular image around the camera: here a sky, sun and hills painted on a canvas with a labelled meridian every 30°, passed as a data URL in MODE_MONOSCOPIC. Created with useDirectMapping false so fovMultiplier can pull the panorama closer or push it away.',
  section: 'Environment',
  tags: ['PhotoDome', 'fovMultiplier', 'useDirectMapping', 'MODE_MONOSCOPIC'],
  docs: ['repo/content/features/featuresDeepDive/environment/360PhotoDome.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
