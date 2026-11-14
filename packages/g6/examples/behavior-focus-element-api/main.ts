// graph.focusElement: the call focus-element makes on click, run from code
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/behavior-data.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(8, 5, 70),
        node: { style: { size: 18, labelText: (d) => String(d.id), labelFill: '#ddd', labelFontSize: 10, labelPlacement: 'bottom' } },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const ids = ['n00', 'n47', 'n06', 'n41', 'n23'];
    if (stage.bar) {
      const out = readout(el);
      out.textContent = 'No focus-element behavior here: the buttons call graph.focusElement(id).';
      for (const id of ids) button(stage.bar, id, async () => ((out.textContent = `focusElement('${id}')`), graph.focusElement(id, { duration: 600 })));
      button(stage.bar, 'n00 + n47', () => graph.focusElement(['n00', 'n47'], { duration: 600 }));
    } else {
      stage.every(1800, (i) => graph.focusElement(ids[i % ids.length]!, { duration: 900 }));
    }
  });

export default mount;
