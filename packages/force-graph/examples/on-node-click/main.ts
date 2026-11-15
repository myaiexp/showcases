// Interaction: onNodeClick receives the clicked node: here it centres the view on it and zooms in
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a node: the view glides to it and zooms in.' });
  const data = clusters(3, stage.preview ? 7 : 11);
  let ms = 1000;
  let zoomTo = 4;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onNodeClick((node) => {
      graph.centerAt(node.x, node.y, ms);
      graph.zoom(zoomTo, ms);
    })
    .onEngineStop(() => graph.zoomToFit(300, 20));

  if (stage.bar) {
    slider(stage.bar, 'duration', 0, 2000, 100, ms, (v) => (ms = v), (v) => `${v} ms`);
    slider(stage.bar, 'zoom', 1.5, 8, 0.5, zoomTo, (v) => (zoomTo = v), (v) => `×${v}`);
    button(stage.bar, 'zoomToFit(600)', () => graph.zoomToFit(600, 20));
  } else {
    const ghost = stage.ghost(graph);
    const nodes = data.nodes as GNode[];
    let i = 0;
    script(stage, async (wait) => {
      const n = nodes[(i++ * 7) % nodes.length]!;
      graph.zoomToFit(500, 20);
      await wait(900);
      ghost.node(n);
      await wait(1100);
      ghost.click();
      await wait(2200);
    });
  }

  return stage.dispose;
};

export default mount;
