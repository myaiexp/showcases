// Picking splats with pc.Picker: the component under a pixel and its 3D point
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { boxCloud, cloudContainer, createSplatScene, discShellCloud, knotCloud } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

const SCALE = 0.25; // pick at quarter resolution

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 10, pitch: -22, autoRotate: ctx.preview ? 5 : 0 });
  const { app, camera, stage } = scene;
  const canvas = stage.canvas;

  // The picker needs ids on the splats, switched on before they render.
  app.scene.gsplat.enableIds = true;

  const device = stage.device;
  const shapes: [string, pc.GSplatContainer, number][] = [
    ['box', cloudContainer(device, boxCloud(5000, 1, 11, 0.09)), -3.4],
    ['knot', cloudContainer(device, knotCloud(6000, 7, 0.07)), 0],
    ['discs', cloudContainer(device, discShellCloud(1600, 1.2)), 3.4],
  ];
  const entities = shapes.map(([name, container, x]) => {
    const entity = scene.add(container, name);
    entity.setPosition(x, 0, 0);
    return entity;
  });

  // A marker where the depth buffer says the ray ended.
  const markerMaterial = new pc.StandardMaterial();
  markerMaterial.emissive = new pc.Color(1, 1, 1);
  markerMaterial.useLighting = false;
  markerMaterial.update();
  const marker = new pc.Entity('marker');
  marker.addComponent('render', { type: 'sphere', material: markerMaterial });
  marker.setLocalScale(0.18, 0.18, 0.18);
  marker.enabled = false;
  app.root.addChild(marker);

  // Depth enabled (4th argument) so getWorldPointAsync works.
  const picker = new pc.Picker(app, 1, 1, true);
  const world = app.scene.layers.getLayerByName('World')!;
  const ac = new AbortController();
  let picking = false;
  let result: HTMLElement | undefined;

  const pick = async (x: number, y: number): Promise<void> => {
    if (picking) return;
    picking = true;
    try {
      picker.resize(canvas.clientWidth * SCALE, canvas.clientHeight * SCALE);
      picker.prepare(camera.camera!, app.scene, [world]);
      const px = x * SCALE;
      const py = y * SCALE;
      const point = await picker.getWorldPointAsync(px, py);
      const selection = await picker.getSelectionAsync(px, py, 1, 1);
      if (ac.signal.aborted) return; // unmounted while the readback was in flight
      const hit = entities.find((e) => selection.includes(e.gsplat as pc.GSplatComponent));
      for (const e of entities) e.setLocalScale(e === hit ? 1.25 : 1, e === hit ? 1.25 : 1, e === hit ? 1.25 : 1);
      marker.enabled = !!point;
      if (point) marker.setPosition(point);
      if (result) result.textContent = hit ? `picked "${hit.name}" at ${point ? [point.x, point.y, point.z].map((v) => v.toFixed(2)).join(', ') : 'no depth'}` : 'nothing under the pointer';
    } catch (error) {
      if (result) result.textContent = `pick failed: ${(error as Error).message}`;
    } finally {
      picking = false;
    }
  };

  if (ctx.preview) {
    // Cards cannot be clicked: sweep a virtual pointer across the canvas instead.
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 0.35) {
        t = 0;
        const k = (app.frame * 0.013) % 1;
        void pick(canvas.clientWidth * (0.15 + 0.7 * k), canvas.clientHeight * 0.5);
      }
    });
  } else {
    const panel = createPanel(el);
    result = panel.readout('Click a shape (drag still orbits)');
    // A click is a press and release that did not move.
    let down: { x: number; y: number } | null = null;
    canvas.addEventListener('pointerdown', (e) => (down = { x: e.offsetX, y: e.offsetY }), { signal: ac.signal });
    canvas.addEventListener(
      'pointerup',
      (e) => {
        if (down && Math.hypot(e.offsetX - down.x, e.offsetY - down.y) < 4) void pick(e.offsetX, e.offsetY);
        down = null;
      },
      { signal: ac.signal },
    );
  }

  return () => {
    ac.abort();
    picker.destroy();
    markerMaterial.destroy();
    scene.dispose();
  };
};

export default mount;
