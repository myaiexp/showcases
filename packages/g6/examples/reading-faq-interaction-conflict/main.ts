// FAQ: drag-canvas turned off while shift is held, so brush-select does not fight it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { hud, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let guard = true;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ringData(stage.preview ? 8 : 14),
        node: { style: { size: 18 }, state: { selected: { fill: '#ff7a45', halo: true } } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        behaviors: [
          // Dragging with shift held must not also pan the canvas.
          { type: 'drag-canvas', enable: (event: { shiftKey?: boolean }) => !guard || event.shiftKey === false },
          { type: 'brush-select', trigger: ['shift'] },
        ],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    show('drag: pan the canvas   shift + drag: brush select');

    if (stage.bar) {
      toggle(stage.bar, 'drag-canvas enable: shiftKey === false', guard, (v) => {
        guard = v;
        show(v ? 'shift + drag brushes without panning' : 'no guard: shift + drag pans and brushes at once');
      });
    } else {
      // No pointer: select nodes in turn, as a brush would.
      stage.every(900, (i) => {
        const ids = Array.from({ length: 8 }, (_, k) => `r-${k}`);
        graph.setElementState(Object.fromEntries(ids.map((id, k) => [id, (k + i) % 8 < 3 ? ['selected'] : []])));
      });
    }
  });

export default mount;
