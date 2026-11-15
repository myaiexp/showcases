// HairMaterial on generated hair cards: the Kajiya-Kay and Marschner shading models and their parameters
import { Vector3 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getEngine, HairMaterial, Mesh, Scene, SceneNode, SphereShape, type HairShadingModel } from '@zephyr3d/scene';
import { animScene, flat } from '../../shared/anim-kit.ts';
import { hairCards, streakShift } from '../../shared/char-kit.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/textures/shift.png': streakShift() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  animScene(scene, { eye: new Vector3(0.9, 1.1, 2.1), target: new Vector3(0, 0.65, 0), floorSize: 3, shadows: false });
  const lamp = new DirectionalLight(scene);
  lamp.intensity = 4;

  // The head sits above the floor
  const headGroup = new SceneNode(scene);
  headGroup.position.setXYZ(0, 0.55, 0);
  const scalp = new Mesh(scene, new SphereShape({ radius: 0.5 }), flat(0.78, 0.55, 0.45));
  scalp.parent = headGroup;

  const material = new HairMaterial();
  material.vertexColor = true; // the card colour and alpha are in the vertex colours
  material.alphaCutoff = 0.35;
  material.cullMode = 'none';
  const hair = new Mesh(scene, hairCards(), material);
  hair.parent = headGroup;

  const shift = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/shift.png', { linearColorSpace: true });
  const apply = (model: HairShadingModel): void => {
    material.shadingModel = model;
    stage.caption(`shadingModel = '${model}'`);
  };
  apply('kajiya-kay');

  if (stage.bar) {
    const bar = stage.bar;
    select(bar, 'shadingModel', ['kajiya-kay', 'marschner'] as HairShadingModel[], 'kajiya-kay', apply);
    select(bar, 'strandDirection', ['tangent', 'binormal'] as const, 'tangent', (v) => (material.strandDirection = v));
    slider(bar, 'kk: specular1Power', [4, 400, 2], material.specular1Power, (v) => (material.specular1Power = v));
    slider(bar, 'kk: specular1Shift', [-0.5, 0.5, 0.01], material.specular1Shift, (v) => (material.specular1Shift = v));
    slider(bar, 'kk: specular2Power', [4, 200, 2], material.specular2Power, (v) => (material.specular2Power = v));
    slider(bar, 'kk: specular2Shift', [-0.5, 0.5, 0.01], material.specular2Shift, (v) => (material.specular2Shift = v));
    slider(bar, 'diffuseWrap', [0, 1, 0.01], material.diffuseWrap, (v) => (material.diffuseWrap = v));
    toggle(bar, 'shift texture', false, (v) => (material.specularShiftTexture = v ? shift : null));
    slider(bar, 'shiftMapScale', [0, 1, 0.01], material.shiftMapScale, (v) => (material.shiftMapScale = v));
    slider(bar, 'marschnerShift', [-0.5, 0.5, 0.01], material.marschnerShift, (v) => (material.marschnerShift = v));
    slider(bar, 'marschnerRoughness', [0.05, 1, 0.01], material.marschnerRoughness, (v) => (material.marschnerRoughness = v));
    slider(bar, 'marschnerAbsorption', [0, 2, 0.02], material.marschnerAbsorption, (v) => (material.marschnerAbsorption = v));
  } else {
    stage.every(3500, (i) => apply(i % 2 ? 'marschner' : 'kajiya-kay'));
  }
  const out = stage.readout();
  if (out) out.textContent = "The two models' parameters are inert under the other: kk: sliders do nothing under marschner, and the marschner sliders do nothing under kajiya-kay.";
  myApp.on('tick', (_dt: number, elapsed: number) => {
    // The light circles the head, so the specular band slides over the cards
    const a = elapsed / 1500;
    lamp.lookAt(new Vector3(2 * Math.cos(a), 1.2, 2 * Math.sin(a)), Vector3.zero(), Vector3.axisPY());
  });
  myApp.run();
});
