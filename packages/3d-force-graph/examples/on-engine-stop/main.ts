// Force engine: onEngineStop fires when the layout freezes, the moment to frame the finished graph
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/data.ts';
import type { TData, TLink, TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

/** A fresh random graph each call, of 20 to 40 nodes. */
function randomGraph(seed: number): TData {
  const r = rng(seed);
  const n = 20 + Math.floor(r() * 20);
  const nodes: TNode[] = Array.from({ length: n }, (_, i) => ({ id: i, name: `node ${i}`, group: 1 + (i % 3) }));
  const links: TLink[] = nodes.slice(1).map((node) => ({ source: node.id, target: Math.floor(r() * (node.id as number)) }));
  return { nodes, links };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'New data starts the layout over. Each time it freezes, onEngineStop frames it with zoomToFit(600, 40).' });

  let fit = true;
  let seed = 11;
  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(randomGraph(seed))
    .nodeLabel('name')
    .nodeAutoColorBy('group')
    .cooldownTime(stage.preview ? 2200 : 3500)
    .onEngineStop(() => {
      if (!fit) return;
      graph.scene().updateMatrixWorld(true);
      graph.zoomToFit(600, stage.preview ? 20 : 40);
      note.textContent = 'onEngineStop → zoomToFit(600, 40)';
    });
  const note = overlay(stage, 'layout running…');

  const regenerate = (): void => {
    graph.graphData(randomGraph(++seed));
    note.textContent = 'layout running…';
  };

  if (stage.preview) stage.every(4200, regenerate);
  else if (stage.bar) {
    button(stage.bar, 'New random graph', regenerate);
    checkbox(stage.bar, 'zoomToFit on stop', true, (v) => (fit = v));
  }

  return stage.dispose;
};

export default mount;
