// Hit test reticle: a ray against real-world geometry places objects
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { pointerRay, transparentInAr, trackPointer } from '../../shared/xr-ar.ts';
import { addXrEntry, createXrScene, xrMaterial, xrShape, type XrEntryHandle } from '../../shared/xr.ts';

const MAX_PLACED = 8;

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { target: new pc.Vec3(0, 0.4, -1.6), distance: 4, pitch: -30, yaw: 0, autoRotate: 0, interactive: false, transparent: false });
  const { app, camera } = scene;

  // The "real world" a simulated hit test probes: the floor and a table top.
  const table = xrShape(app.root, 'box', xrMaterial('#6b5a49'), [0.6, 0.35, -1.8], [1.1, 0.7, 0.8]);
  const tableBox = table.render!.meshInstances[0]!;
  const reticle = new pc.Entity('reticle');
  reticle.addComponent('render', { type: 'torus', material: xrMaterial('#ffffff', { emissive: new pc.Color(1, 1, 1) }), castShadows: false });
  reticle.setLocalScale(0.18, 0.18, 0.18);
  app.root.addChild(reticle);
  const cone = xrMaterial('#e8794a');
  const placed: pc.Entity[] = [];
  const place = (): void => {
    const e = xrShape(app.root, 'cone', cone, [0, 0, 0], [0.12, 0.2, 0.12]);
    e.setPosition(reticle.getPosition().x, reticle.getPosition().y + 0.1, reticle.getPosition().z);
    e.setRotation(reticle.getRotation());
    placed.push(e);
    if (placed.length > MAX_PLACED) placed.shift()!.destroy();
  };

  const state = { real: false, hits: 0 };
  const ray = new pc.Ray();
  const point = new pc.Vec3();
  const ac = new AbortController();
  const mouse = trackPointer(scene.stage.canvas, ac.signal, ctx.preview ? undefined : place);
  let t = 0;
  let nextPlace = 1.5;
  app.on('update', (dt: number) => {
    t += dt;
    if (state.real) return;
    if (ctx.preview) mouse.set(0.5 + Math.sin(t * 0.7) * 0.25, 0.62 + Math.sin(t * 1.3) * 0.12);
    pointerRay(camera, scene.stage.canvas, mouse.x, mouse.y, ray);
    // Nearest of the table box and the floor plane y = 0: the simulated result.
    let hit = false;
    if (tableBox.aabb.intersectsRay(ray, point)) hit = true;
    else if (ray.direction.y < -0.001) {
      const s = -ray.origin.y / ray.direction.y;
      point.copy(ray.direction).mulScalar(s).add(ray.origin);
      hit = true;
    }
    reticle.enabled = hit;
    if (hit) {
      reticle.setPosition(point.x, point.y + 0.01, point.z);
      reticle.setEulerAngles(0, t * 40, 0);
    }
    if (ctx.preview && t > nextPlace) {
      nextPlace += 1.5;
      if (hit) place();
    }
  });

  // The real path: a hit test source from the viewer's forward ray, once an AR session runs.
  const onStart = (): void => {
    if (app.xr?.type !== pc.XRTYPE_AR || !app.xr.hitTest.supported) return;
    app.xr.hitTest.start({
      spaceType: pc.XRSPACE_VIEWER,
      callback: (err, source) => {
        if (err || !source) return;
        state.real = true;
        source.on('result', (position: pc.Vec3, rotation: pc.Quat) => {
          state.hits++;
          reticle.enabled = true;
          reticle.setPosition(position);
          reticle.setRotation(rotation);
        });
        source.once('remove', () => (state.real = false));
      },
    });
  };
  const onSelect = (): void => {
    if (state.real) place();
  };
  app.xr?.on('start', onStart);
  app.xr?.input.on('select', onSelect);
  const undoClear = transparentInAr(app, camera);

  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout('');
    app.on('update', () => {
      info.textContent = state.real
        ? `real hit test running, ${state.hits} results`
        : `simulated: app.xr.hitTest.supported is ${!!app.xr?.hitTest.supported}; move the mouse over the floor and table, click to place`;
    });
    panel.button('Clear placed', () => placed.splice(0).forEach((e) => e.destroy()));
    entry = addXrEntry(el, panel, scene, [{ type: pc.XRTYPE_AR, space: pc.XRSPACE_LOCALFLOOR, label: 'Enter AR' }]);
  }
  return () => {
    ac.abort();
    undoClear();
    app.xr?.off('start', onStart);
    app.xr?.input.off('select', onSelect);
    entry?.dispose();
    scene.dispose();
  };
};

export default mount;
