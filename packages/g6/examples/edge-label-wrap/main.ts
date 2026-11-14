// Long edge label: labelWordWrap, labelMaxWidth, labelMaxLines and labelTextOverflow
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

interface Opts {
  wrap: boolean;
  width: number;
  lines: number;
  overflow: 'ellipsis' | 'clip';
}
const edgeOf = (o: Opts): EdgeOptions => ({
  style: {
    stroke: '#5CACEE',
    labelText: 'This is a very long edge label that needs line wrapping',
    labelWordWrap: o.wrap,
    labelMaxWidth: o.width,
    labelMaxLines: o.lines,
    labelTextOverflow: o.overflow,
    labelTextAlign: 'center',
    labelFontSize: 11,
    labelBackground: true,
  },
});
const STEPS: Opts[] = [
  { wrap: true, width: 120, lines: 2, overflow: 'ellipsis' },
  { wrap: true, width: 80, lines: 4, overflow: 'ellipsis' },
  { wrap: true, width: 80, lines: 2, overflow: 'ellipsis' },
  { wrap: false, width: 120, lines: 1, overflow: 'ellipsis' },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o = { ...STEPS[0]! };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(o),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'labelWordWrap', o.wrap, (v) => ((o.wrap = v), void apply()));
      slider(stage.bar, 'labelMaxWidth (px)', [40, 300, 5], o.width, (v) => ((o.width = v), void apply()));
      slider(stage.bar, 'labelMaxLines', [1, 6, 1], o.lines, (v) => ((o.lines = v), void apply()));
      select(stage.bar, 'labelTextOverflow', ['ellipsis', 'clip'] as const, o.overflow, (v) => ((o.overflow = v), void apply()));
    } else {
      stage.every(1500, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
