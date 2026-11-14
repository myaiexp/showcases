// Picker: render IDs to a pick buffer, read the mesh instance under a pixel
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addGround, addShape, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, canvas } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 55, 30, { castShadows: true, shadowDistance: 40 });
  addGround(app, '#3a4152', 30);

  const types = ['box', 'sphere', 'cone', 'cylinder', 'capsule', 'torus'] as const;
  const shapes = types.map((type, i) => {
    const a = (i / types.length) * Math.PI * 2;
    return addShape(app, type, '#8794ab', [Math.cos(a) * 3.2, 0.9, Math.sin(a) * 3.2], 1.8);
  });
  const hot = colorMaterial('#ffb020', { emissive: new pc.Color(0.9, 0.4, 0) });
  // The marker lives on its own layer, which the picker is not asked to render.
  const markerLayer = new pc.Layer({ name: 'Marker' });
  app.scene.layers.push(markerLayer);
  const hit = addShape(app, 'sphere', '#ffffff', [0, -10, 0], 0.25, { castShadows: false, layers: [markerLayer.id] });
  hit.render!.meshInstances[0]!.material = colorMaterial('#ffffff', { emissive: new pc.Color(1, 1, 1), useLighting: false });

  const world = app.scene.layers.getLayerByName('World')!;
  const camera = addCamera(app, { layers: [world.id, markerLayer.id] });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0.8, 0), distance: 11, pitch: -30, autoRotate: 8, interactive: false });

  // The pick buffer at half the canvas resolution, with depth so getWorldPointAsync works.
  const scale = 0.5;
  const picker = new pc.Picker(app, canvas.clientWidth * scale, canvas.clientHeight * scale, true);
  const observer = new ResizeObserver(() => picker.resize(canvas.clientWidth * scale, canvas.clientHeight * scale));
  observer.observe(canvas);

  // The probe: the pointer when it is over the canvas, a sweeping path otherwise.
  const probe = document.createElement('div');
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  canvas.before(wrap);
  wrap.append(canvas, probe);
  Object.assign(probe.style, {
    position: 'absolute', left: '0', top: '0', width: '18px', height: '18px', margin: '-9px 0 0 -9px',
    border: '2px solid #ffb020', borderRadius: '50%', pointerEvents: 'none',
  });
  const pointer = { x: 0, y: 0, over: false };
  const onMove = (e: PointerEvent): void => {
    const box = canvas.getBoundingClientRect();
    pointer.x = e.clientX - box.left;
    pointer.y = e.clientY - box.top;
    pointer.over = true;
  };
  const onLeave = (): void => void (pointer.over = false);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerleave', onLeave);

  const readout = ctx.preview ? null : createPanel(el).readout('move over the shapes');
  let highlighted: { instance: pc.MeshInstance; material: pc.Material } | null = null;
  let busy = false;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const x = pointer.over ? pointer.x : w * (0.5 + Math.sin(t * 0.8) * 0.28);
    const y = pointer.over ? pointer.y : h * (0.62 + Math.sin(t * 1.7) * 0.2);
    probe.style.transform = `translate(${x}px, ${y}px)`;
    shapes.forEach((s, i) => s.rotate(0, (i % 2 ? -20 : 20) * dt, 0));

    // 1. Prepare: render the scene's IDs (and depth) from this camera.
    picker.prepare(camera.camera!, app.scene, [world]);
    if (busy) return;
    busy = true;
    // 2. Query: read the pixel under the probe, in pick-buffer coordinates.
    const px = x * scale;
    const py = y * scale;
    void Promise.all([picker.getSelectionAsync(px, py), picker.getWorldPointAsync(px, py)])
      .then(([selection, point]) => {
        if (highlighted) highlighted.instance.material = highlighted.material;
        highlighted = null;
        const instance = selection[0] as pc.MeshInstance | undefined;
        const isShape = instance && shapes.some((s) => s.render!.meshInstances.includes(instance));
        if (instance && isShape) {
          highlighted = { instance, material: instance.material! };
          instance.material = hot;
        }
        if (point) hit.setPosition(point);
        else hit.setPosition(0, -10, 0);
        if (readout) readout.textContent = instance ? `picked: ${instance.node.name}${point ? `  at ${point.x.toFixed(1)}, ${point.y.toFixed(1)}, ${point.z.toFixed(1)}` : ''}` : 'nothing under the probe';
      })
      .catch(() => undefined)
      .finally(() => (busy = false));
  });

  return () => {
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerleave', onLeave);
    observer.disconnect();
    orbit.dispose();
    picker.destroy();
    stage.dispose();
  };
};

export default mount;
