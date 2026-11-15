// Utility: graph2ScreenCoords turns node positions into pixels, so HTML labels can follow the nodes
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { Vector3, type PerspectiveCamera } from 'three';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each name is an HTML element moved every frame to graph2ScreenCoords(x, y, z) of its node.' });

  const data = team() as TData;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel(() => '') // no tooltip: the HTML labels do the naming
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2500 : 5000);

  // The layer sits over the pane, and is cleared with it when the graph is freed.
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none';
  stage.container.append(layer);
  const labels = data.nodes.map((n) => {
    const tag = document.createElement('div');
    tag.textContent = String(n.name);
    tag.style.cssText = `position:absolute;left:0;top:0;white-space:nowrap;font:${stage.preview ? 9 : 12}px/1 sans-serif;
      color:#fff;background:rgba(20,24,40,.7);border:1px solid rgba(255,255,255,.25);border-radius:3px;padding:1px 4px;display:none`;
    layer.append(tag);
    return { n, tag };
  });

  let show = true;
  const camera = graph.camera() as PerspectiveCamera;
  const v = new Vector3();
  stage.loop(() => {
    for (const { n, tag } of labels) {
      if (!show || n.x === undefined) {
        tag.style.display = 'none';
        continue;
      }
      const p = graph.graph2ScreenCoords(n.x, n.y ?? 0, n.z ?? 0);
      // The method only returns x and y: a node behind the camera must be hidden by its depth.
      const inFront = v.set(n.x, n.y ?? 0, n.z ?? 0).project(camera).z < 1;
      tag.style.display = inFront ? '' : 'none';
      tag.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -150%)`;
    }
  });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.onEngineStop(() => cam.fit(25));
  } else {
    fitOnce(graph);
    if (stage.bar) checkbox(stage.bar, 'HTML labels', true, (on) => (show = on));
  }

  return stage.dispose;
};

export default mount;
