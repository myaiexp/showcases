// camera(): the PerspectiveCamera itself; a field-of-view change shows its lens
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import type { PerspectiveCamera } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A wide lens close up bulges the globe; a narrow one from afar flattens it.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointAltitude(0.25)
    .pointColor(() => '#ffbe0b');
  globe.controls().autoRotate = true;

  const camera = globe.camera() as PerspectiveCamera;
  const info = stage.bar && readout(stage.box);
  // Keep the globe about the same size on screen: move the camera as the lens changes.
  const setFov = (fov: number): void => {
    // Distance from the centre is (1 + altitude) radii; keep distance × tan(fov / 2) fixed.
    const keep = 3.5 * Math.tan((50 * Math.PI) / 360);
    camera.fov = fov;
    camera.updateProjectionMatrix();
    globe.pointOfView({ altitude: keep / Math.tan((fov * Math.PI) / 360) - 1 });
    if (info) info.textContent = `camera.fov = ${fov}°, camera.position.length() = ${camera.position.length().toFixed(0)}`;
  };
  setFov(50);

  if (stage.bar) slider(stage.bar, 'fov', 10, 120, 1, 50, setFov, (v) => `${v}°`);
  else stage.loop((_dt, t) => setFov(Math.round(65 + 45 * Math.sin(t * 0.8))));

  return stage.dispose;
};

export default mount;
