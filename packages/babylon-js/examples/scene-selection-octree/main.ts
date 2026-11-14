// createOrUpdateSelectionOctree on 900 instances, with selection timing
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
  const { scene, canvas } = stage;
  // A narrow view down into a big field: the camera sees only a slice of the meshes.
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.15, 14, new Vector3(0, 0, 0), scene);
  camera.fov = 0.6;
  camera.maxZ = 60;
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.3, 1, 0.2), scene);
  scene.clearColor = new Color4(0.05, 0.07, 0.14, 1);

  const source = MeshBuilder.CreateBox('source', { size: 0.8 }, scene);
  const mat = new StandardMaterial('mat', scene);
  mat.diffuseColor = new Color3(0.4, 0.75, 0.95);
  source.material = mat;
  source.isVisible = false;
  const SIDE = 30;
  const grid: Mesh[] = [];
  for (let x = 0; x < SIDE; x++) {
    for (let z = 0; z < SIDE; z++) {
      const instance = source.createInstance(`box${x}-${z}`) as unknown as Mesh;
      instance.position.set((x - SIDE / 2) * 2, Math.sin(x * 0.7 + z * 0.4) * 0.8, (z - SIDE / 2) * 2);
      instance.freezeWorldMatrix(); // static meshes, as an octree wants
      grid.push(instance);
    }
  }
  // A moving mesh must be registered as dynamic content or the octree would never move it.
  const mover = MeshBuilder.CreateSphere('mover', { diameter: 1.4 }, scene);
  mover.material = mat;

  const instrumentation = new SceneInstrumentation(scene);
  instrumentation.captureActiveMeshesEvaluationTime = true;

  let octreeOn = false;
  let capacity = 64;
  let depth = 2;
  const setOctree = (on: boolean): void => {
    octreeOn = on;
    if (on) {
      const octree = scene.createOrUpdateSelectionOctree(capacity, depth);
      octree.dynamicContent.push(mover);
    } else {
      scene._selectionOctree = undefined as never; // no public off switch: dropping it falls back to testing every mesh
    }
  };

  const caption = document.createElement('div');
  const show = (): void => {
    caption.textContent = `selection octree ${octreeOn ? `ON (capacity ${capacity}, depth ${depth})` : 'OFF'}  |  active meshes: ${scene.getActiveMeshes().length} of ${scene.meshes.length}  |  evaluation: ${instrumentation.activeMeshesEvaluationTimeCounter.current.toFixed(2)} ms`;
  };

  let t = 0;
  stage.run(() => {
    t += stage.engine.getDeltaTime() / 1000;
    mover.position.set(Math.cos(t) * 5, 1.2, Math.sin(t) * 5);
    camera.alpha += ctx.preview ? 0.004 : 0;
  });
  const tick = window.setInterval(show, 300);

  let flip = 0;
  if (ctx.preview) {
    Object.assign(caption.style, { position: 'absolute', left: '0', top: '0', padding: '3px 6px', fontSize: '10px', color: 'var(--green)', background: 'rgba(8,9,14,0.75)', pointerEvents: 'none' });
    wrap.append(caption);
    flip = window.setInterval(() => setOctree(!octreeOn), 2500);
  } else {
    const panel = createPanel(el);
    Object.assign(caption.style, { color: 'var(--fg-1)' });
    panel.row();
    panel.el.lastElementChild?.append(caption);
    panel.row();
    panel.check('createOrUpdateSelectionOctree', false, (on) => setOctree(on));
    panel.slider('capacity', 8, 128, 8, capacity, (v) => ((capacity = v), octreeOn && setOctree(true)));
    panel.slider('maxDepth', 1, 4, 1, depth, (v) => ((depth = v), octreeOn && setOctree(true)));
  }

  return () => {
    window.clearInterval(tick);
    window.clearInterval(flip);
    instrumentation.dispose();
    void grid;
    stage.dispose();
    wrap.remove();
  };
};

export default mount;
