// LensRenderingPipeline: aberration, edge blur, distortion, grain, DOF
import {
  ArcRotateCamera,
  Color3,
  HemisphericLight,
  LensRenderingPipeline,
  MeshBuilder,
  PointLight,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.35, 6, new Vector3(0, 1, 6), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene).intensity = 0.6;
  new PointLight('lamp', new Vector3(0, 4, 8), scene).intensity = 0.8;
  MeshBuilder.CreateGround('ground', { width: 10, height: 40 }, scene).position.z = 10;

  // A corridor of lit spheres receding from the camera, so focus distance has something to pick.
  for (let i = 0; i < 12; i++) {
    const s = MeshBuilder.CreateSphere(`s${i}`, { diameter: 0.9 }, scene);
    s.position.set(i % 2 ? 1.6 : -1.6, 0.45, i * 2.2);
    const mat = new StandardMaterial(`s${i}`, scene);
    mat.diffuseColor = Color3.FromHSV(i * 30, 0.6, 1);
    mat.emissiveColor = i % 3 === 0 ? new Color3(0.8, 0.8, 0.6) : Color3.Black();
    s.material = mat;
  }

  const parameters = {
    edge_blur: 1.0,
    chromatic_aberration: 1.0,
    distortion: 1.0,
    grain_amount: 0.4,
    dof_focus_distance: 8,
    dof_aperture: 3.0,
    dof_darken: 0.1,
    dof_pentagon: true,
    dof_gain: 1.0,
    dof_threshold: 1.0,
    blur_noise: true,
  };
  const lens = new LensRenderingPipeline('lensEffects', parameters, scene, 1.0, [camera]);

  if (!ctx.preview) {
    const panel = createPanel(el);
    // The docs' method table says setFocusDepth; the class itself names it setFocusDistance.
    panel.slider('focus distance', 1, 30, 0.5, parameters.dof_focus_distance, (v) => lens.setFocusDistance(v));
    panel.slider('aperture', 0, 8, 0.1, parameters.dof_aperture, (v) => lens.setAperture(v));
    panel.slider('darken out of focus', 0, 1, 0.05, parameters.dof_darken, (v) => lens.setDarkenOutOfFocus(v));
    panel.row();
    panel.slider('chromatic aberration', 0, 5, 0.1, 1, (v) => lens.setChromaticAberration(v));
    panel.slider('edge blur', 0, 5, 0.1, 1, (v) => lens.setEdgeBlur(v));
    panel.slider('distortion', 0, 3, 0.1, 1, (v) => lens.setEdgeDistortion(v));
    panel.slider('grain', 0, 1, 0.05, parameters.grain_amount, (v) => lens.setGrainAmount(v));
    panel.check('pentagon bokeh', true, (on) => (on ? lens.enablePentagonBokeh() : lens.disablePentagonBokeh()));
  }

  let t = 0;
  stage.run(() => {
    // The card racks focus back and forth along the corridor.
    if (ctx.preview) lens.setFocusDistance(10 + Math.sin((t += 0.015)) * 8);
  });

  return () => {
    lens.dispose();
    stage.dispose();
  };
};

export default mount;
