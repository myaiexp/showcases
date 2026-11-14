// A dashed combo border: lineDash, lineDashOffset and lineCap
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const CAPS = ['round', 'butt', 'square'] as const;
const comboOf = (dash: number, gap: number, offset: number, cap: (typeof CAPS)[number]): ComboOptions => ({
  style: { fill: '#FFF1F0', fillOpacity: 0.1, stroke: '#F5222D', lineWidth: 3, lineDash: [dash, gap], lineDashOffset: offset, lineCap: cap },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let dash = 6;
    let gap = 6;
    let offset = 0;
    let cap: (typeof CAPS)[number] = 'round';
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 24, data: single(), combo: comboOf(dash, gap, offset, cap), animation: false }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(dash, gap, offset, cap));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'dash', [1, 30, 1], dash, (v) => ((dash = v), void apply()));
      slider(stage.bar, 'gap', [1, 30, 1], gap, (v) => ((gap = v), void apply()));
      slider(stage.bar, 'lineDashOffset', [0, 60, 1], offset, (v) => ((offset = v), void apply()));
      select(stage.bar, 'lineCap', CAPS, cap, (v) => ((cap = v), void apply()));
    }
    // The offset creeps so the dashes march round the border.
    stage.every(120, () => ((offset = (offset + 1) % 60), apply()));
  });

export default mount;
