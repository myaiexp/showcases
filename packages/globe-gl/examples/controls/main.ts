// controls(): the OrbitControls behind dragging and zooming, tuned directly
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'These are Three.js OrbitControls properties; globe.gl sets damping and keeps the target at the centre.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container)).globeImageUrl(day).pointsData(cities);
  const controls = globe.controls();
  const R = globe.getGlobeRadius();
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  // Keep the camera between 1.5 and 4 globe radii from the centre.
  controls.minDistance = R * 1.5;
  controls.maxDistance = R * 4;

  if (stage.bar) {
    checkbox(stage.bar, 'autoRotate', true, (v) => (controls.autoRotate = v));
    slider(stage.bar, 'autoRotateSpeed', -10, 10, 0.5, 2, (v) => (controls.autoRotateSpeed = v));
    checkbox(stage.bar, 'enableZoom', true, (v) => (controls.enableZoom = v));
    checkbox(stage.bar, 'enableRotate', true, (v) => (controls.enableRotate = v));
    slider(stage.bar, 'dampingFactor', 0.01, 0.5, 0.01, controls.dampingFactor, (v) => (controls.dampingFactor = v));
  } else {
    // The card reverses the spin every few seconds.
    stage.every(2500, () => (controls.autoRotateSpeed *= -1));
  }

  return stage.dispose;
};

export default mount;
