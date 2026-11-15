// zephyr3d example: Physical lighting: sun lux and camera exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Physical lighting: sun lux and camera exposure',
  summary:
    'scene.lightingMode = \'physical\' reads a DirectionalLight in lux (illuminance) and exposes the image from the camera\'s aperture, shutterSpeed, ISO and exposureCompensation. The readout shows the derived EV100 and exposure; the defaults are Sunny 16 under a 100,000 lux sun.',
  section: 'Lighting',
  tags: ['scene.lightingMode', 'DirectionalLight.illuminance', 'camera.aperture', 'camera.shutterSpeed', 'camera.ISO', 'camera.exposureCompensation', 'camera.EV100', 'camera.exposure'],
  docs: ['repo/apps/doc/web/en/lighting-physical.md', 'repo/apps/doc/web/en/lighting-direct.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
