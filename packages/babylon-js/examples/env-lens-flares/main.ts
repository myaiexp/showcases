// LensFlareSystem: flares on the line from a moving sun through the centre
import {
  ArcRotateCamera,
  Color3,
  Color4,
  HemisphericLight,
  LensFlare,
  LensFlareSystem,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { glow, hexagon, ring } from './images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.12, 0.2, 0.35, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.3, 14, new Vector3(0, 2, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene);

  // The emitter can be a camera, a light or a mesh: here a bright sun sphere.
  const sun = MeshBuilder.CreateSphere('sun', { diameter: 1.2 }, scene);
  const sunMat = new StandardMaterial('sun', scene);
  sunMat.emissiveColor = new Color3(1, 0.95, 0.7);
  sunMat.disableLighting = true;
  sun.material = sunMat;

  const system = new LensFlareSystem('lensFlareSystem', sun, scene);
  // size (0..1), position on the sun-to-centre line (0 = on the sun, <0 behind it), colour, image.
  new LensFlare(0.25, 0, new Color3(1, 1, 1), glow(), system);
  new LensFlare(0.075, 0.5, new Color3(0.8, 0.56, 0.72), hexagon(), system);
  new LensFlare(0.1, -0.15, new Color3(0.71, 0.8, 0.95), ring(), system);
  new LensFlare(0.15, 0.25, new Color3(0.95, 0.89, 0.71), hexagon(), system);
  new LensFlare(0.06, 0.8, new Color3(0.6, 0.9, 0.7), glow(), system);
  new LensFlare(0.2, 1.1, new Color3(0.5, 0.6, 1), ring(), system);

  // A pillar that hides the flares when it passes in front of the sun: isBlocker.
  const pillar = MeshBuilder.CreateBox('pillar', { width: 1.2, height: 6, depth: 1.2 }, scene);
  pillar.position.set(0, 3, 4);
  pillar.material = new StandardMaterial('pillar', scene);
  pillar.isBlocker = true;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('isEnabled', true, (on) => (system.isEnabled = on));
    panel.check('pillar.isBlocker', true, (on) => (pillar.isBlocker = on));
  }

  let t = 0;
  stage.run(() => {
    t += scene.getEngine().getDeltaTime() / 1000;
    sun.position.set(Math.cos(t * 0.4) * 9, 5 + Math.sin(t * 0.25) * 2, 12);
  });

  return () => {
    system.dispose();
    stage.dispose();
  };
};

export default mount;
