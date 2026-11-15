// Render control: camera() is the three PerspectiveCamera; change fov, then updateProjectionMatrix()
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { PerspectiveCamera } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A wide lens bends perspective; a narrow one flattens it. "Keep size" slides the camera back as the lens narrows (a dolly zoom).' });

  let dolly = true;
  let ready = false;
  let fov0 = 50;
  let dist0 = 300;
  let dir = { x: 0, y: 0, z: 1 };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(2500);
  const camera = graph.camera() as PerspectiveCamera;
  const note = overlay(stage);

  graph.onEngineStop(() => {
    if (ready) return;
    dist0 = fitNow(graph, 20);
    fov0 = camera.fov;
    const p = camera.position;
    dir = { x: p.x / dist0, y: p.y / dist0, z: p.z / dist0 };
    ready = true;
  });

  const setFov = (fov: number): void => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
    note.textContent = `camera().fov = ${Math.round(fov)}`;
    if (!ready || !dolly) return;
    // Keep the graph's apparent size: distance grows as tan(fov / 2) shrinks.
    const d = (dist0 * Math.tan((fov0 * Math.PI) / 360)) / Math.tan((fov * Math.PI) / 360);
    graph.cameraPosition({ x: dir.x * d, y: dir.y * d, z: dir.z * d }, { x: 0, y: 0, z: 0 });
  };

  if (stage.preview) {
    stage.loop((_dt, t) => setFov(65 + 40 * Math.sin(t * 0.8)));
  } else if (stage.bar) {
    slider(stage.bar, 'fov', 15, 120, 1, camera.fov, setFov, (v) => `${v}°`);
    checkbox(stage.bar, 'keep size (dolly zoom)', true, (v) => (dolly = v));
  }

  return stage.dispose;
};

export default mount;
