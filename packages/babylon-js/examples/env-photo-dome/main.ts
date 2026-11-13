// PhotoDome: an equirectangular image around the camera, FOV adjustment
import { ArcRotateCamera, PhotoDome, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { panorama } from './panorama.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  // Standing at the centre of the dome and looking around.
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 0.1, Vector3.Zero(), scene);
  camera.lowerRadiusLimit = camera.upperRadiusLimit = 0.1;
  if (!ctx.preview) camera.attachControl(canvas, true);

  // The source must be equirectangular; here it is painted in code and passed as a data URL.
  // fovMultiplier only works with useDirectMapping false.
  const dome = new PhotoDome('testdome', panorama(ctx.preview ? 1024 : 2048), { resolution: 32, size: 1000, useDirectMapping: false }, scene);
  dome.imageMode = PhotoDome.MODE_MONOSCOPIC;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('fovMultiplier', 0, 2, 0.05, dome.fovMultiplier, (v) => (dome.fovMultiplier = v));
    panel.readout('Drag to look around: the painted meridians mark every 30° of longitude.');
  }

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });
  return () => {
    dome.dispose();
    stage.dispose();
  };
};

export default mount;
