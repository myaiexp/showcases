// optimize-viewport-transform shapes: which parts stay visible while the view moves
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Shape = { className?: string };
const rules = {
  'nodes (default)': (type: string) => type === 'node',
  'node key shape only': (type: string, shape: Shape) => type === 'node' && shape.className === 'key',
  'nodes and edges': (type: string) => type === 'node' || type === 'edge',
  'nothing': () => false,
};
type Rule = keyof typeof rules;
const names = Object.keys(rules) as Rule[];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(stage.preview ? 6 : 8, stage.preview ? 4 : 6, 50),
        node: { style: { size: 14, labelText: 'Drag Canvas!', labelFill: '#ddd', labelFontSize: 9, labelPlacement: 'bottom' } },
        behaviors: ['drag-canvas', 'zoom-canvas', { type: 'optimize-viewport-transform', key: 'optimize', debounce: 800, shapes: rules['nodes (default)'] }],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const apply = (r: Rule) => graph.updateBehavior({ key: 'optimize', shapes: rules[r] });
    if (stage.bar) {
      readout(el).textContent = 'Drag the canvas: shapes decides which parts stay on screen during the move.';
      select(stage.bar, 'shapes', names, 'nodes (default)', apply);
    } else {
      const say = overlay(stage);
      stage.every(2200, async (i) => {
        const r = names[(i - 1) % names.length]!;
        apply(r);
        say(`shapes: ${r}`);
        await graph.translateBy(i % 2 ? [-30, 10] : [30, -10], { duration: 1000 });
      });
    }
  });

export default mount;
