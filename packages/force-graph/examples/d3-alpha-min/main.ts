// Force engine: d3AlphaMin is the alpha below which the layout counts as settled and stops
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { createStage, type Pane } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['alphaMin 0', 'alphaMin 0.1'],
    hint: 'Alpha cools from 1 on every layout run. With alphaMin 0 it runs on until cooldownTime; a higher alphaMin stops far sooner.',
  });
  const data = clusters(3, 8);
  const graphs: { graph: ForceGraph<GNode, GLink>; pane: Pane; min: number; ticks: number; done: boolean }[] = [];

  for (const [i, min] of [0, 0.1].entries()) {
    const pane = stage.panes[i]!;
    const entry = { graph: null as unknown as ForceGraph<GNode, GLink>, pane, min, ticks: 0, done: false };
    const caption = (): void => {
      if (pane.caption) pane.caption.textContent = `min ${entry.min}: ${entry.ticks} ticks${entry.done ? ' (stopped)' : ''}`;
    };
    entry.graph = stage.own(new ForceGraph<GNode, GLink>(pane.container), pane)
      .graphData(structuredClone(data))
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .d3AlphaMin(min)
      .cooldownTime(stage.preview ? 4000 : 8000)
      .onEngineTick(() => {
        entry.ticks++;
        caption();
      })
      .onEngineStop(() => {
        entry.done = true;
        caption();
        entry.graph.zoomToFit(300, 18);
      });
    graphs.push(entry);
  }

  const reheat = (): void => {
    for (const e of graphs) {
      e.ticks = 0;
      e.done = false;
      e.graph.d3ReheatSimulation();
    }
  };
  if (stage.bar) {
    slider(stage.bar, 'right pane d3AlphaMin', 0, 0.5, 0.01, 0.1, (v) => {
      graphs[1]!.min = v;
      graphs[1]!.graph.d3AlphaMin(v);
      if (stage.panes[1]!.caption) stage.panes[1]!.caption!.textContent = `min ${v}`;
    }, (v) => v.toFixed(2));
    button(stage.bar, 'd3ReheatSimulation()', reheat);
  } else {
    stage.every(6500, reheat);
  }

  return stage.dispose;
};

export default mount;
