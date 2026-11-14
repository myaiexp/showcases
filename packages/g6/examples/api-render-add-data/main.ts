// New data needs render() to be laid out; draw() leaves it unplaced
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { hud, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ringData(5),
        node: { style: { size: 16, labelText: (d) => String(d.id) } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular', radius: 70 },
        autoFit: 'center',
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    let n = 0;
    const add = () => {
      const id = `new-${n++}`;
      graph.addData({ nodes: [{ id }], edges: [{ id: `e-${id}`, source: id, target: 'r-0' }] });
      show(`addData: ${id}`);
    };

    if (stage.bar) {
      button(stage.bar, 'addData + draw()', () => {
        add();
        void graph.draw();
      });
      button(stage.bar, 'addData + render()', () => {
        add();
        void graph.render();
      });
    } else {
      stage.every(1500, (i) => {
        add();
        // Odd steps only draw (the new node waits at the origin), even steps render (it joins the ring).
        return i % 2 ? graph.draw() : graph.render();
      });
    }
  });

export default mount;
