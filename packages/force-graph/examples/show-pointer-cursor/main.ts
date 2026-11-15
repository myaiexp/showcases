// Interaction: showPointerCursor decides, per object, whether the canvas shows the pointer cursor
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverTour } from '../../shared/tour.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Only the orange group is clickable here: the cursor turns to a pointer over those nodes and stays an arrow over the rest.' });
  const data = clusters(3, stage.preview ? 7 : 11);
  const clickable = (n: GNode | undefined): boolean => n?.group === 1;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeColor((n) => (clickable(n) ? '#e4572e' : '#9aa3ad'))
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    // The pointer only appears for objects that have a click handler, and this test says which of those.
    .onNodeClick((n) => say(`clicked ${n.name}`))
    .showPointerCursor((obj) => clickable(obj as GNode | undefined))
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'cursor: default');

  // The canvas gets a `clickable` class that sets the pointer cursor; read what the browser resolves.
  const canvas = stage.container.querySelector('canvas');
  let last = '';
  stage.every(120, () => {
    const cursor = canvas ? getComputedStyle(canvas).cursor : 'default';
    if (cursor !== last) {
      last = cursor;
      say(`cursor: ${cursor === 'pointer' ? 'pointer' : 'default'}`);
    }
  });

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    const nodes = data.nodes as GNode[];
    hoverTour(stage, ghost, () => [nodes[2], nodes[9], nodes[4], nodes[17]], { every: 1700 });
  }

  return stage.dispose;
};

export default mount;
