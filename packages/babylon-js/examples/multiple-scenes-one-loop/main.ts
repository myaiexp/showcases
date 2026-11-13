// Two scenes in one render loop, the second drawn over with autoClear off
import { ArcRotateCamera, Color3, Color4, DynamicTexture, FreeCamera, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  // The stage gives scene0 and the engine; scene1 is created on the same engine by hand.
  const stage = createStage(el, ctx);
  const scene0 = stage.scene;
  const engine = stage.engine;
  const scene1 = new Scene(engine);

  // scene0: a spinning cube world seen by an orbit camera.
  const camera0 = new ArcRotateCamera('camera0', -Math.PI / 2, 1.1, 9, new Vector3(0, 0, 0), scene0);
  if (!ctx.preview) camera0.attachControl(stage.canvas, true);
  new HemisphericLight('light0', new Vector3(0.3, 1, 0.2), scene0);
  scene0.clearColor = new Color4(0.05, 0.07, 0.14, 1);
  const cubes = [0, 1, 2, 3, 4].map((i) => {
    const cube = MeshBuilder.CreateBox(`cube${i}`, { size: 1.2 }, scene0);
    cube.position.set((i - 2) * 1.8, Math.sin(i) * 0.8, 0);
    const m = new StandardMaterial(`cube${i}-mat`, scene0);
    m.diffuseColor = Color3.FromHSV(i * 60, 0.65, 0.95);
    cube.material = m;
    return cube;
  });

  // scene1: a heads-up display scene drawn over scene0. Without autoClear = false it would
  // erase everything scene0 just rendered.
  scene1.autoClear = false;
  const camera1 = new FreeCamera('camera1', new Vector3(0, 0, -6), scene1);
  camera1.setTarget(Vector3.Zero());
  new HemisphericLight('light1', new Vector3(0, 0, -1), scene1);
  const badge = MeshBuilder.CreatePlane('badge', { width: 2.6, height: 0.8 }, scene1);
  badge.position.set(-2.2, 1.9, 0);
  const label = new DynamicTexture('label', { width: 512, height: 160 }, scene1, false);
  label.hasAlpha = true;
  const g = label.getContext() as CanvasRenderingContext2D;
  g.fillStyle = 'rgba(20,20,30,0.85)';
  g.fillRect(0, 0, 512, 160);
  g.fillStyle = '#ffd36b';
  g.font = 'bold 64px sans-serif';
  g.fillText('scene1', 120, 100);
  label.update();
  const labelMat = new StandardMaterial('label-mat', scene1);
  labelMat.diffuseTexture = label;
  labelMat.emissiveColor = Color3.White();
  labelMat.disableLighting = true;
  badge.material = labelMat;
  const spinner = MeshBuilder.CreateTorus('spinner', { diameter: 1.2, thickness: 0.25, tessellation: 32 }, scene1);
  spinner.position.set(2.6, 1.9, 0);
  const spinnerMat = new StandardMaterial('spinner-mat', scene1);
  spinnerMat.emissiveColor = new Color3(1, 0.6, 0.2);
  spinner.material = spinnerMat;

  let overlay = true;
  let t = 0;
  // The engine's loop renders both scenes, in order, every frame.
  engine.stopRenderLoop();
  engine.runRenderLoop(() => {
    t += engine.getDeltaTime() / 1000;
    cubes.forEach((c, i) => (c.rotation.y = t * (0.6 + i * 0.2)));
    spinner.rotation.x = t * 2;
    if (ctx.preview) camera0.alpha += 0.004;
    scene0.render();
    if (overlay) scene1.render();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('render scene1 on top', true, (on) => (overlay = on));
    panel.check('scene1.autoClear (erases scene0!)', false, (on) => (scene1.autoClear = on));
  }

  return () => {
    scene1.dispose();
    stage.dispose();
  };
};

export default mount;
