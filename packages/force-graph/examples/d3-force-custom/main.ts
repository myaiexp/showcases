// Force engine: a hand-written force (alpha) => … nudges each node toward the anchor of its group
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, PALETTE, type GLink, type GNode } from '../../shared/data.ts';
import { keepFitted } from '../../shared/fit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three anchors (the crosses) pull their group with a force written here. Rotate them and the groups follow.' });
  let strength = 0.25;
  let turn = 0;
  const radius = stage.preview ? 90 : 130;
  const anchor = (group: number): { x: number; y: number } => {
    const a = turn + ((group - 1) * 2 * Math.PI) / 3;
    return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
  };

  // A d3 force is a function of alpha; `initialize` hands it the simulation's nodes.
  let nodes: GNode[] = [];
  const toAnchor = Object.assign(
    (alpha: number) => {
      for (const n of nodes) {
        const a = anchor(n.group ?? 1);
        n.vx = (n.vx ?? 0) + (a.x - (n.x ?? 0)) * strength * alpha;
        n.vy = (n.vy ?? 0) + (a.y - (n.y ?? 0)) * strength * alpha;
      }
    },
    {
      initialize(ns: GNode[]) {
        nodes = ns;
      },
    },
  );

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 12))
    .nodeColor((n) => PALETTE[(n.group ?? 1) - 1]!)
    .linkColor(() => 'rgba(0,0,0,0.2)')
    .d3Force('anchor', toAnchor)
    .autoPauseRedraw(false)
    .cooldownTime(2500)
    .onRenderFramePre((c, scale) => {
      for (const g of [1, 2, 3]) {
        const a = anchor(g);
        c.strokeStyle = PALETTE[g - 1]!;
        c.lineWidth = 2 / scale;
        c.beginPath();
        c.moveTo(a.x - 6, a.y);
        c.lineTo(a.x + 6, a.y);
        c.moveTo(a.x, a.y - 6);
        c.lineTo(a.x, a.y + 6);
        c.stroke();
      }
    });
  keepFitted(graph, 30);

  const rotate = (): void => {
    turn += (2 * Math.PI) / 3;
    graph.d3ReheatSimulation();
  };
  if (stage.bar) {
    slider(stage.bar, 'strength', 0, 1, 0.05, strength, (v) => {
      strength = v;
      graph.d3ReheatSimulation();
    }, (v) => v.toFixed(2));
    button(stage.bar, 'rotate anchors', rotate);
  } else {
    stage.every(3200, rotate);
  }

  return stage.dispose;
};

export default mount;
