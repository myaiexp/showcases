// DOM overlay: HTML buttons over the AR view, kept out of the 3D select
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { transparentInAr } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

const COLOURS = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa'];

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.4, -1.5), distance: 4, pitch: -25, autoRotate: 8 });
  const { app, camera } = scene;
  const cubes: pc.Entity[] = [];
  const spawn = (): void => {
    const e = xrShape(app.root, 'box', xrMaterial(COLOURS[cubes.length % COLOURS.length]!), [(Math.random() - 0.5) * 2.4, 0.2, -0.8 - Math.random() * 1.6], 0.4);
    e.setLocalEulerAngles(0, Math.random() * 90, 0);
    cubes.push(e);
    if (cubes.length > 12) cubes.shift()!.destroy();
    counter.textContent = `${cubes.length} cubes`;
  };

  // The overlay is an ordinary element laid over the canvas; in an AR session it becomes the DOM overlay root.
  const layer = addCanvasLabels(scene.stage.canvas, []);
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'absolute', left: '0', right: '0', top: '0', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px',
    background: 'rgba(20,23,31,0.7)', color: '#e8ebf2', font: '0.8rem system-ui, sans-serif', pointerEvents: ctx.preview ? 'none' : 'auto',
  });
  const title = document.createElement('strong');
  title.textContent = 'AR overlay';
  const counter = document.createElement('span');
  counter.style.marginRight = 'auto';
  const add = document.createElement('button');
  add.textContent = 'Add cube';
  const clear = document.createElement('button');
  clear.textContent = 'Clear';
  for (const b of [add, clear]) b.className = 'btn';
  overlay.append(title, counter, add, clear);
  layer.append(overlay);
  add.addEventListener('click', spawn);
  clear.addEventListener('click', () => {
    cubes.splice(0).forEach((c) => c.destroy());
    counter.textContent = '0 cubes';
  });
  // A tap on a button must not also count as a select in the 3D scene.
  const stop = (evt: Event): void => evt.preventDefault();
  const buttons = [add, clear];
  buttons.forEach((b) => b.addEventListener('beforexrselect', stop));

  const dom = app.xr?.domOverlay;
  if (dom) dom.root = layer;
  spawn();
  let t = 0;
  let next = 0.8;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview && t > next) {
      next += 1.2;
      if (cubes.length >= 6) cubes.splice(0).forEach((c) => c.destroy());
      spawn();
    }
  });

  const undoClear = transparentInAr(app, camera);
  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      info.textContent = `domOverlay.supported: ${!!dom?.supported}, available in session: ${!!dom?.available}; the bar over the canvas is the overlay`;
    });
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR' }]);
  }
  return () => {
    undoClear();
    if (dom) dom.root = null;
    buttons.forEach((b) => b.removeEventListener('beforexrselect', stop));
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
