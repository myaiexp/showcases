// GlowLayer: emissive parts of the scene glow, with per-mesh colour override and exclusions
import {
  ArcRotateCamera,
  Color3,
  Color4,
  GlowLayer,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  scene.clearColor = new Color4(0.02, 0.02, 0.05, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 12, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene).intensity = 0.3;
  MeshBuilder.CreateGround('ground', { width: 14, height: 14 }, scene);

  // Neon tubes: the glow comes from each material's emissive colour.
  const tubes = [0, 1, 2, 3, 4].map((i) => {
    const tube = MeshBuilder.CreateTorus(`tube${i}`, { diameter: 1.6 + i * 0.9, thickness: 0.12, tessellation: 64 }, scene);
    tube.position.y = 1.5;
    const mat = new StandardMaterial(`tube${i}`, scene);
    mat.emissiveColor = Color3.FromHSV(i * 60 + 180, 0.8, 1);
    mat.disableLighting = true;
    tube.material = mat;
    return tube;
  });
  // The "saber": its glow colour is chosen by customEmissiveColorSelector, not its material.
  const saber = MeshBuilder.CreateCylinder('saber', { diameter: 0.12, height: 4 }, scene);
  saber.position.set(4.5, 2, 0);
  const saberMat = new StandardMaterial('saber', scene);
  saberMat.emissiveColor = Color3.White();
  saber.material = saberMat;

  // Creation options shape the blur; intensity can change any time.
  const glow = new GlowLayer('glow', scene, { mainTextureFixedSize: ctx.preview ? 256 : 1024, blurKernelSize: 64, mainTextureSamples: 4 });
  glow.intensity = 0.9;
  const saberGlow = new Color4(1, 0.1, 0.9, 1);
  glow.customEmissiveColorSelector = (mesh, _subMesh, material, result) => {
    if (mesh === saber) result.copyFrom(saberGlow);
    else {
      const e = (material as StandardMaterial).emissiveColor;
      result.set(e.r, e.g, e.b, 1);
    }
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('intensity', 0, 3, 0.05, glow.intensity, (v) => (glow.intensity = v));
    panel.slider('blurKernelSize', 4, 128, 2, glow.blurKernelSize, (v) => (glow.blurKernelSize = v));
    panel.check('exclude the outer tube (addExcludedMesh)', false, (on) => (on ? glow.addExcludedMesh(tubes[4]!) : glow.removeExcludedMesh(tubes[4]!)));
  }

  let t = 0;
  stage.run(() => {
    t += 0.016;
    tubes.forEach((tube, i) => {
      tube.rotation.x = Math.sin(t + i * 0.5) * 0.8;
      tube.rotation.z = Math.cos(t * 0.7 + i) * 0.8;
    });
    saber.rotation.z = Math.sin(t * 1.3) * 0.6;
  });

  return () => {
    glow.dispose();
    stage.dispose();
  };
};

export default mount;
