// Render control: cameraPosition moves the camera to a point and aims it, instantly or over a number of ms
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitNow } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

interface View {
  name: string;
  /** Where the camera goes, given the fitted distance `d`, and what it looks at. */
  at: (d: number, hub: TNode) => { pos: { x: number; y: number; z: number }; look: { x: number; y: number; z: number } };
}

const ORIGIN = { x: 0, y: 0, z: 0 };
const VIEWS: View[] = [
  { name: 'front', at: (d) => ({ pos: { x: 0, y: 0, z: d }, look: ORIGIN }) },
  // A tiny z keeps the camera off the exact vertical, where "up" is undefined.
  { name: 'top', at: (d) => ({ pos: { x: 0, y: d, z: d * 0.02 }, look: ORIGIN }) },
  { name: 'side', at: (d) => ({ pos: { x: d, y: 0, z: 0 }, look: ORIGIN }) },
  { name: 'diagonal', at: (d) => ({ pos: { x: d * 0.6, y: d * 0.5, z: d * 0.6 }, look: ORIGIN }) },
  {
    name: 'beside a node',
    at: (_d, hub) => {
      const look = { x: hub.x ?? 0, y: hub.y ?? 0, z: hub.z ?? 0 };
      return { pos: { x: look.x + 30, y: look.y + 15, z: look.z + 50 }, look };
    },
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls cameraPosition({x, y, z}, lookAt, ms): the position tweens, the aim turns in a third of the time.' });

  let ms = 1500;
  let dist = 300;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 12) as TData)
    .nodeLabel('name')
    .cooldownTime(2500)
    .onEngineStop(() => {
      dist = fitNow(graph, 20);
    });

  const note = overlay(stage);
  const go = (view: View): void => {
    const hub = graph.graphData().nodes[0]!;
    const { pos, look } = view.at(dist, hub);
    graph.cameraPosition(pos, look, ms);
    const r = (n: number): number => Math.round(n);
    note.textContent = `${view.name}\ncameraPosition({ x: ${r(pos.x)}, y: ${r(pos.y)}, z: ${r(pos.z)} }, lookAt, ${ms})`;
  };

  if (stage.preview) {
    ms = 1400;
    let i = 0;
    stage.every(2200, () => go(VIEWS[i++ % VIEWS.length]!));
  } else if (stage.bar) {
    slider(stage.bar, 'ms', 0, 4000, 100, ms, (v) => (ms = v));
    for (const view of VIEWS) button(stage.bar, view.name, () => go(view));
    const pos = readout(stage.bar);
    stage.every(150, () => {
      const p = graph.cameraPosition();
      pos.textContent = `camera ${Math.round(p.x)}, ${Math.round(p.y)}, ${Math.round(p.z)}`;
    });
  }

  return stage.dispose;
};

export default mount;
