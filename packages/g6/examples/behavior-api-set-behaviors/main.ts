// graph.setBehaviors: add and remove behaviors at run time, with the list read back
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { line, overlay, simClick, simDrag, simHover } from '../../shared/behavior-sim.ts';
import { readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const available = ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select', 'hover-activate'] as const;
type Name = (typeof available)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { state: { selected: { fill: '#ffa940' }, active: { fill: '#52c41a' } } },
        behaviors: ['drag-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const names = (): string[] => graph.getBehaviors().map((b) => (typeof b === 'string' ? b : typeof b === 'function' ? 'fn' : b.type));
    if (stage.bar) {
      const out = readout(el);
      const show = () => (out.textContent = `getBehaviors(): ${JSON.stringify(names())}`);
      show();
      for (const name of available) {
        toggle(stage.bar, name, name === 'drag-canvas', (on) => {
          // Functional form: derive the new list from the current one.
          graph.setBehaviors((prev) => (on ? [...prev, name] : prev.filter((b) => b !== name)));
          show();
        });
      }
    } else {
      const say = overlay(stage);
      const steps: Name[][] = [['drag-canvas'], ['drag-canvas', 'hover-activate'], ['click-select', 'drag-element'], []];
      stage.every(2400, async (i) => {
        const list = steps[i % steps.length]!;
        graph.setBehaviors(list);
        say(`[${list.join(', ')}]`);
        const [x, y] = cell(1, 1, 64);
        if (list.includes('hover-activate')) simHover(graph, [x, y]);
        else if (list.includes('click-select')) {
          await simClick(stage, graph, [x, y]);
          await simDrag(stage, graph, line([x, y], [x + 25, y + 20], 8), 40);
          await simDrag(stage, graph, line([x + 25, y + 20], [x, y], 8), 40);
        } else await simDrag(stage, graph, line(graph.getCanvasByViewport([40, 170]), graph.getCanvasByViewport([110, 120]), 8), 40);
      });
    }
  });

export default mount;
