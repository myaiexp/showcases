// SSRRenderingPipeline: screen-space reflections on a glossy floor
import {
  ArcRotateCamera,
  Color3,
  Constants,
  HemisphericLight,
  MeshBuilder,
  SSRRenderingPipeline,
  StandardMaterial,
  Vector3,
  type Mesh,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.25, 13, new Vector3(0, 1, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.2, 1, -0.4), scene);

  // Reflectivity comes from the material: a StandardMaterial's specularColor.
  const floor = MeshBuilder.CreateGround('floor', { width: 20, height: 20 }, scene);
  const floorMat = new StandardMaterial('floor', scene);
  floorMat.diffuseColor = new Color3(0.08, 0.09, 0.12);
  floorMat.specularColor = new Color3(0.8, 0.8, 0.8);
  floor.material = floorMat;

  const shapes: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const s = i % 2 ? MeshBuilder.CreateBox(`b${i}`, { size: 1.3 }, scene) : MeshBuilder.CreateSphere(`s${i}`, { diameter: 1.5 }, scene);
    const a = (i / 6) * Math.PI * 2;
    s.position.set(Math.cos(a) * 4, 1, Math.sin(a) * 4);
    const mat = new StandardMaterial(`m${i}`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 60, 0.75, 1);
    // Black specular: these shapes don't reflect, so the SSR pass skips their pixels.
    mat.specularColor = Color3.Black();
    s.material = mat;
    shapes.push(s);
  }

  const ssr = new SSRRenderingPipeline('ssr', scene, [camera], false, Constants.TEXTURETYPE_UNSIGNED_BYTE);
  ssr.thickness = 0.1;
  ssr.strength = 1;
  ssr.reflectionSpecularFalloffExponent = 1;
  ssr.step = 1;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('isEnabled', true, (on) => (ssr.isEnabled = on));
    panel.check('debug colours', false, (on) => (ssr.debug = on));
    panel.check('blur (blurDispersionStrength)', false, (on) => (ssr.blurDispersionStrength = on ? 0.03 : 0));
    panel.row();
    panel.slider('strength', 0, 2, 0.05, ssr.strength, (v) => (ssr.strength = v));
    panel.slider('thickness', 0, 2, 0.01, ssr.thickness, (v) => (ssr.thickness = v));
    panel.slider('step', 1, 16, 1, ssr.step, (v) => (ssr.step = v));
    panel.slider('roughnessFactor', 0, 1, 0.01, ssr.roughnessFactor, (v) => (ssr.roughnessFactor = v));
  }

  stage.run(() => {
    shapes.forEach((s, i) => {
      s.rotation.y += 0.01;
      s.position.y = 1 + Math.sin(performance.now() / 600 + i) * 0.4;
    });
    if (ctx.preview) camera.alpha += 0.003;
  });

  return () => {
    ssr.dispose();
    stage.dispose();
  };
};

export default mount;
