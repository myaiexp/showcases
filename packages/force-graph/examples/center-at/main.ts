// Render control: centerAt pans the view to graph coordinates, with an optional transition in ms
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a node and a duration, then pan to it. 0 ms jumps; the zoom stays where it is.' });
  const data = clusters(3, stage.preview ? 6 : 10);
  const hubs = data.nodes.filter((n) => String(n.id).endsWith('-0')) as GNode[];

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(0, 20).zoom(1.8, 0));
  const say = status(stage, 'centerAt() = 0, 0');
  const report = (): void => {
    const c = graph.centerAt();
    say(`centerAt() = ${c.x.toFixed(0)}, ${c.y.toFixed(0)}`);
  };
  stage.every(250, report);

  if (stage.bar) {
    let ms = 800;
    let name = String(data.nodes[0]!.id);
    select(stage.bar, 'node', data.nodes.map((n) => String(n.id)), (v) => (name = v));
    slider(stage.bar, 'duration', 0, 2000, 100, ms, (v) => (ms = v), (v) => `${v} ms`);
    button(stage.bar, 'centerAt(node.x, node.y, ms)', () => {
      const n = (data.nodes as GNode[]).find((x) => x.id === name);
      if (n) graph.centerAt(n.x, n.y, ms);
    });
    button(stage.bar, 'centerAt(undefined, y)', () => {
      // Each coordinate is optional: this moves in one dimension only.
      const n = (data.nodes as GNode[]).find((x) => x.id === name);
      if (n) graph.centerAt(undefined, n.y, ms);
    });
  } else {
    let i = 0;
    stage.after(3200, () => {
      const step = (): void => {
        const n = hubs[i++ % hubs.length]!;
        graph.centerAt(n.x, n.y, 900);
      };
      step();
      stage.every(1800, step);
    });
  }

  return stage.dispose;
};

export default mount;
