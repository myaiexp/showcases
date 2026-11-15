// Render control: cameraPosition called every frame moves the camera on a circle around the graph
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No tween here: a frame loop sets cameraPosition({x, z}) on a circle and looks at the origin.' });

  let speed = 0.4; // radians per second
  let running = true;
  let radius = 0;
  let height = 0;
  let angle = 0;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .cooldownTime(2500)
    .onEngineStop(() => {
      // Fit first, with no transition: a cameraPosition call in the loop would cut a tween short.
      fitNow(graph, 20);
      const { x, y, z } = graph.cameraPosition();
      radius = Math.hypot(x, z);
      height = y;
      angle = Math.atan2(x, z);
    });

  stage.loop((dt) => {
    if (!radius || !running) return;
    angle += speed * dt;
    graph.cameraPosition({ x: radius * Math.sin(angle), y: height, z: radius * Math.cos(angle) }, { x: 0, y: 0, z: 0 });
  });

  if (stage.bar) {
    slider(stage.bar, 'speed', -1.5, 1.5, 0.1, speed, (v) => (speed = v), (v) => `${v.toFixed(1)} rad/s`);
    checkbox(stage.bar, 'orbit', true, (v) => (running = v));
  }

  return stage.dispose;
};

export default mount;
