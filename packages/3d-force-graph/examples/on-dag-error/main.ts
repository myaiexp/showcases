// Force engine: onDagError receives the node ids of a cycle, and the DAG layout carries on regardless
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { diagonalFit } from '../../shared/camera.ts';
import { layeredDag, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A link from the last node back to the root makes a cycle. Without onDagError the library would throw; with it, the loop is reported and laid out best-effort.' });
  const log = stage.bar && readout(stage.bar, 'no cycle');

  const base = layeredDag(4, stage.preview ? 3 : 4) as TData;
  const last = base.nodes[base.nodes.length - 1]!.id;
  const pairs = (ids: (string | number)[]): Set<string> => new Set(ids.slice(1).map((id, i) => `${ids[i]}>${id}`));
  let loop: (string | number)[] = [];
  let loopLinks = new Set<string>();
  let withCycle = false;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(structuredClone(base))
    .nodeLabel('name')
    .nodeColor((n) => (loop.includes(n.id) ? '#ff5d73' : '#7aa2f7'))
    .linkColor((l) => (loopLinks.has(`${typeof l.source === 'object' ? l.source.id : l.source}>${typeof l.target === 'object' ? l.target.id : l.target}`) ? '#ff5d73' : '#c0caf5'))
    .linkWidth((l) => (loopLinks.has(`${typeof l.source === 'object' ? l.source.id : l.source}>${typeof l.target === 'object' ? l.target.id : l.target}`) ? 2 : 0))
    .linkDirectionalArrowLength(3)
    .linkDirectionalArrowRelPos(1)
    .dagMode('td')
    .dagLevelDistance(40)
    .onDagError((ids) => {
      // Called inside the data update: only remember the loop here, repaint afterwards.
      loop = ids;
      loopLinks = pairs(ids);
    })
    .cooldownTime(stage.preview ? 1000 : 4000);
  const note = overlay(stage, 'no cycle');

  let first = true;
  graph.onEngineStop(() => {
    graph.scene().updateMatrixWorld(true);
    if (first) diagonalFit(graph, 20);
    else graph.zoomToFit(500, 20);
    first = false;
  });

  const toggle = (): void => {
    withCycle = !withCycle;
    loop = [];
    loopLinks = new Set();
    const links: TLink[] = base.links.map((l) => ({ source: l.source as string, target: l.target as string }));
    if (withCycle) links.push({ source: last, target: 'root' });
    graph.graphData({ nodes: graph.graphData().nodes, links });
    // The update runs on the next digest; repaint once it has called onDagError.
    stage.after(80, () => {
      graph.nodeColor(graph.nodeColor()).linkColor(graph.linkColor()).linkWidth(graph.linkWidth());
      const text = loop.length ? `onDagError: ${loop.join(' → ')}` : 'no cycle';
      note.textContent = text;
      if (log) log.textContent = text;
    });
  };

  if (stage.preview) stage.every(3200, toggle);
  else if (stage.bar) button(stage.bar, 'Add or remove the back link', toggle);

  return stage.dispose;
};

export default mount;
