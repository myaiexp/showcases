// Render control: zoomToFit(ms, padding) moves the camera until every node is in view
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const AWAY = [
  { x: 500, y: 200, z: 300 },
  { x: -400, y: 300, z: -200 },
  { x: 100, y: -500, z: 250 },
  { x: 300, y: 80, z: -500 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Throw the camera away, then zoomToFit brings every node back. The dashed frame is the padding.' });

  let duration = 1200;
  let padding = 40;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .cooldownTime(2500);

  const frame = document.createElement('div');
  frame.style.cssText = 'position:absolute;pointer-events:none;border:1px dashed rgba(192,202,245,.55);transition:inset .4s';
  stage.container.append(frame);
  const note = overlay(stage);
  const fit = (): void => {
    graph.scene().updateMatrixWorld(true);
    graph.zoomToFit(duration, padding);
    frame.style.inset = `${padding}px`;
    note.textContent = `zoomToFit(${duration}, ${padding})`;
  };
  graph.onEngineStop(fit);

  if (stage.preview) {
    duration = 1100;
    const pads = [0, 20, 45, 10];
    let i = 0;
    stage.every(2600, () => {
      graph.cameraPosition(AWAY[i % AWAY.length]!, { x: 0, y: 0, z: 0 });
      padding = pads[i++ % pads.length]!;
      stage.after(500, fit);
    });
  } else if (stage.bar) {
    slider(stage.bar, 'ms', 0, 3000, 100, duration, (v) => (duration = v));
    slider(stage.bar, 'padding', 0, 150, 5, padding, (v) => {
      padding = v;
      frame.style.inset = `${padding}px`;
    }, (v) => `${v}px`);
    button(stage.bar, 'zoomToFit', fit);
    let i = 0;
    button(stage.bar, 'Throw the camera away', () => graph.cameraPosition(AWAY[i++ % AWAY.length]!, { x: 0, y: 0, z: 0 }));
  }

  return stage.dispose;
};

export default mount;
