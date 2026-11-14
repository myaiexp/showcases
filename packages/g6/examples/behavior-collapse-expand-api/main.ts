// collapseElement and expandElement: the same fold without a pointer, and the collapsed flag
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 70, y: 50 } },
            { id: 'node2', combo: 'combo1', style: { x: 140, y: 50 } },
            { id: 'node3', combo: 'combo2', style: { x: 100, y: 130 } },
          ],
          edges: [{ source: 'node2', target: 'node3' }],
          combos: [
            { id: 'combo1', combo: 'combo2', style: { labelText: 'combo1' } },
            { id: 'combo2', style: { labelText: 'combo2' } },
          ],
        },
        behaviors: ['collapse-expand'],
        autoFit: 'view',
        padding: 16,
      }),
    );
    await graph.render();
    const isCollapsed = (id: string) => graph.getComboData(id)?.style?.collapsed === true;
    if (stage.bar) {
      const out = readout(el);
      const show = () => (out.textContent = `combo1 collapsed: ${isCollapsed('combo1')}, combo2 collapsed: ${isCollapsed('combo2')}`);
      show();
      let animation = true;
      toggle(stage.bar, 'animation', true, (v) => (animation = v));
      button(stage.bar, 'collapse combo1', async () => (await graph.collapseElement('combo1', { animation }), show()));
      button(stage.bar, 'expand combo1', async () => (await graph.expandElement('combo1', { animation }), show()));
      button(stage.bar, 'collapse combo2', async () => (await graph.collapseElement('combo2', { animation }), show()));
      button(stage.bar, 'expand combo2', async () => (await graph.expandElement('combo2', { animation }), show()));
    } else {
      const steps = [
        () => graph.collapseElement('combo1'),
        () => graph.collapseElement('combo2'),
        () => graph.expandElement('combo2'),
        () => graph.expandElement('combo1'),
      ];
      stage.every(1500, (i) => steps[i % steps.length]!());
    }
  });

export default mount;
