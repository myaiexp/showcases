// Force engine: d3AlphaDecay sets how fast the layout cools, so how long nodes keep sorting themselves out
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { scramble } from '../../shared/shake.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['decay 0.0228', 'decay 0.004'],
    hint: 'Both start scrambled. Fast decay freezes the layout early, slow decay keeps the nodes moving; α is the estimated alpha.',
  });
  const data = clusters(3, 8);
  const rows = [0.0228, 0.004].map((decay, i) => {
    const pane = stage.panes[i]!;
    const row = { graph: null as unknown as ForceGraph<GNode, GLink>, decay, ticks: 0 };
    const caption = (): void => {
      // d3 cools alpha by (target - alpha) * decay each tick, so from 1 it is (1 - decay)^ticks.
      const alpha = (1 - row.decay) ** row.ticks;
      if (pane.caption) pane.caption.textContent = `${row.decay}  α≈${alpha.toFixed(2)}`;
    };
    row.graph = stage.own(new ForceGraph<GNode, GLink>(pane.container), pane)
      .graphData(structuredClone(data))
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .d3AlphaDecay(decay)
      .cooldownTime(60000)
      .onEngineTick(() => {
        row.ticks++;
        if (row.ticks % 6 === 0) {
          caption();
          if (row.ticks % 30 === 0) row.graph.zoomToFit(200, 16);
        }
      });
    return row;
  });

  const restart = (): void => {
    for (const r of rows) {
      scramble(r.graph, 120);
      r.ticks = 0;
      r.graph.d3ReheatSimulation();
    }
  };
  if (stage.bar) {
    slider(stage.bar, 'right pane d3AlphaDecay', 0.001, 0.05, 0.001, 0.004, (v) => {
      rows[1]!.decay = v;
      rows[1]!.graph.d3AlphaDecay(v);
    }, (v) => v.toFixed(3));
    button(stage.bar, 'scramble and reheat', restart);
  } else {
    stage.every(7000, restart);
  }

  return stage.dispose;
};

export default mount;
