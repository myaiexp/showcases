// freezeActiveMeshes, freezeWorldMatrix and other switches, timed
import { ArcRotateCamera, Color3, Color4, HemisphericLight, MeshBuilder, SceneInstrumentation, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mesh } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { position: 'relative', width: '100%' });
  el.append(wrap);
  const stage = createStage(wrap, ctx);
  const { scene, canvas, engine } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.2, 40, new Vector3(0, 0, 0), scene);
  camera.fov = 0.7;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);

  // 600 static boxes over twelve materials, and one sphere that keeps moving.
  const materials = Array.from({ length: 12 }, (_, i) => Object.assign(new StandardMaterial(`mat${i}`, scene), { diffuseColor: Color3.FromHSV(i * 30, 0.6, 0.9) }));
  const boxes: Mesh[] = [];
  for (let i = 0; i < 600; i++) {
    const box = MeshBuilder.CreateBox(`box${i}`, { size: 0.9 }, scene);
    box.position.set(((i % 30) - 15) * 1.8, Math.sin(i * 0.3) * 1.5, (Math.floor(i / 30) - 10) * 1.8);
    box.material = materials[i % 12]!;
    boxes.push(box);
  }
  const mover = MeshBuilder.CreateSphere('mover', { diameter: 2 }, scene);
  mover.material = materials[3]!;
  // Must be set before freezing the active meshes, or the mover would stop being drawn.
  mover.alwaysSelectAsActiveMesh = true;

  const instrumentation = new SceneInstrumentation(scene);
  instrumentation.captureActiveMeshesEvaluationTime = true;
  instrumentation.captureFrameTime = true;

  const switches = {
    worldMatrices: (on: boolean): void => boxes.forEach((b) => (on ? b.freezeWorldMatrix() : b.unfreezeWorldMatrix())),
    materials: (on: boolean): void => materials.forEach((m) => (on ? m.freeze() : m.unfreeze())),
    activeMeshes: (on: boolean): void => void (on ? scene.freezeActiveMeshes() : scene.unfreezeActiveMeshes()),
    boundingInfo: (on: boolean): void => boxes.forEach((b) => (b.doNotSyncBoundingInfo = on)),
    pointerPicking: (on: boolean): void => void (scene.skipPointerMovePicking = on),
    dirtyMechanism: (on: boolean): void => void (scene.blockMaterialDirtyMechanism = on),
  };
  const all = (on: boolean): void => {
    for (const fn of Object.values(switches)) fn(on);
  };

  const caption = document.createElement('div');
  const show = (): void => {
    caption.textContent = `${engine.getFps().toFixed(0)} fps | active meshes ${scene.getActiveMeshes().length} of ${scene.meshes.length} | active meshes evaluation ${instrumentation.activeMeshesEvaluationTimeCounter.current.toFixed(2)} ms | frame ${instrumentation.frameTimeCounter.current.toFixed(1)} ms`;
  };
  const tick = window.setInterval(show, 400);

  let t = 0;
  stage.run(() => {
    t += engine.getDeltaTime() / 1000;
    mover.position.set(Math.cos(t) * 14, 2, Math.sin(t * 0.8) * 10);
    camera.alpha += ctx.preview ? 0.003 : 0;
  });

  let flip = 0;
  if (ctx.preview) {
    Object.assign(caption.style, { position: 'absolute', left: '0', top: '0', padding: '3px 6px', fontSize: '10px', color: 'var(--green)', background: 'rgba(8,9,14,0.75)', pointerEvents: 'none', maxWidth: '100%' });
    wrap.append(caption);
    let on = false;
    flip = window.setInterval(() => all((on = !on)), 3000);
  } else {
    const panel = createPanel(el);
    Object.assign(caption.style, { color: 'var(--fg-1)' });
    panel.row();
    panel.el.lastElementChild?.append(caption);
    panel.row();
    panel.check('mesh.freezeWorldMatrix() on the boxes', false, switches.worldMatrices);
    panel.check('material.freeze()', false, switches.materials);
    panel.check('mesh.doNotSyncBoundingInfo', false, switches.boundingInfo);
    panel.row();
    panel.check('scene.freezeActiveMeshes() (orbit: the culling list stays)', false, switches.activeMeshes);
    panel.check('scene.skipPointerMovePicking', false, switches.pointerPicking);
    panel.check('scene.blockMaterialDirtyMechanism', false, switches.dirtyMechanism);
    panel.button('All on / off', (() => {
      let on = false;
      return () => all((on = !on));
    })());
  }

  return () => {
    window.clearInterval(tick);
    window.clearInterval(flip);
    scene.blockMaterialDirtyMechanism = false;
    instrumentation.dispose();
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
