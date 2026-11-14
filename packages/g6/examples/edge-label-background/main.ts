// Edge label background: fill, stroke, radius, padding, dash and shadow
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const LOOKS = ['filled', 'outlined', 'dashed', 'shadow'] as const;
type Look = (typeof LOOKS)[number];
const edgeOf = (look: Look, radius: number): EdgeOptions => {
  const base = { stroke: '#7e3feb', lineWidth: 2, labelText: 'node1 to node2', labelBackground: true, labelPadding: [2, 10], labelBackgroundRadius: radius };
  const looks: Record<Look, Record<string, unknown>> = {
    filled: { labelFill: '#222', labelBackgroundFill: '#f9f0ff', labelBackgroundFillOpacity: 1 },
    outlined: { labelFill: '#d3adf7', labelBackgroundFill: 'transparent', labelBackgroundStroke: '#7e3feb', labelBackgroundLineWidth: 2 },
    dashed: { labelFill: '#d3adf7', labelBackgroundStroke: '#7e3feb', labelBackgroundLineWidth: 2, labelBackgroundLineDash: [4, 3] },
    shadow: { labelFill: '#fff', labelBackgroundFill: '#531dab', labelBackgroundShadowColor: 'rgba(0,0,0,0.6)', labelBackgroundShadowBlur: 6, labelBackgroundShadowOffsetY: 3 },
  };
  return { style: { ...base, ...looks[look] } };
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let look: Look = 'filled';
    let radius = 4;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(look, radius),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(look, radius));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'look', LOOKS, look, (v) => ((look = v), void apply()));
      slider(stage.bar, 'labelBackgroundRadius', [0, 20, 1], radius, (v) => ((radius = v), void apply()));
    } else {
      stage.every(1200, (i) => ((look = LOOKS[i % LOOKS.length]!), (radius = i % 2 ? 12 : 3), apply()));
    }
  });

export default mount;
