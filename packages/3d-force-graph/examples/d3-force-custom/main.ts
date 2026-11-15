// Force engine: d3Force adds a hand-written force that pulls each group towards its own anchor point
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { fitOnce } from '../../shared/camera.ts';
import { clusters, PALETTE, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

type Moving = TNode & { vx?: number; vy?: number; vz?: number };
const ANCHORS = [
  { x: -90, y: -30, z: 0 },
  { x: 90, y: -30, z: 0 },
  { x: 0, y: 70, z: 60 },
];

/** A d3 force is a function of alpha with an `initialize(nodes)` that hands it the nodes. */
function anchorForce(strength: () => number) {
  let nodes: Moving[] = [];
  const force = (alpha: number): void => {
    const k = strength() * alpha;
    for (const n of nodes) {
      const a = ANCHORS[((n.group ?? 1) - 1) % ANCHORS.length]!;
      n.vx = (n.vx ?? 0) + (a.x - (n.x ?? 0)) * k;
      n.vy = (n.vy ?? 0) + (a.y - (n.y ?? 0)) * k;
      n.vz = (n.vz ?? 0) + (a.z - (n.z ?? 0)) * k;
    }
  };
  force.initialize = (given: Moving[]): void => {
    nodes = given;
  };
  return force;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The force reads each node\'s group and nudges its velocity towards that group\'s anchor in x, y and z.' });

  let strength = 0.4;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<Moving, TLink>)
    .graphData(clusters(3, stage.preview ? 8 : 14) as TData)
    .nodeLabel('name')
    .nodeColor((n) => PALETTE[(n.group ?? 1) % PALETTE.length]!)
    .d3Force('anchor', anchorForce(() => strength))
    .cooldownTime(stage.preview ? 2200 : 6000);
  const note = overlay(stage, "d3Force('anchor', force)");

  const retune = (v: number): void => {
    strength = v;
    graph.d3ReheatSimulation();
    note.textContent = `anchor force strength ${v}`;
  };

  if (stage.preview) {
    graph.onEngineStop(() => {
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(500, 15);
    });
    const steps = [0, 1.2, 0.4];
    let i = 0;
    stage.every(3200, () => retune(steps[i++ % steps.length]!));
  } else {
    fitOnce(graph);
    if (stage.bar) {
      slider(stage.bar, 'anchor strength', 0, 2, 0.05, strength, retune, (v) => v.toFixed(2));
      checkbox(stage.bar, 'custom force', true, (on) => {
        // A null force removes it from the simulation; a function adds it back.
        graph.d3Force('anchor', on ? anchorForce(() => strength) : null);
        graph.d3ReheatSimulation();
        graph.onEngineStop(() => graph.zoomToFit(600, 40));
      });
    }
  }

  return stage.dispose;
};

export default mount;
