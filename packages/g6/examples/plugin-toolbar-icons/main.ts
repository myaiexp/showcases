// toolbar plugin showing all eleven built-in icon ids; clicks are logged
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const ICONS = ['zoom-in', 'zoom-out', 'redo', 'undo', 'edit', 'delete', 'auto-fit', 'export', 'reset', 'request-fullscreen', 'exit-fullscreen'];

const mount: Mount = (el, ctx) =>
  mountGraph(
    el,
    ctx,
    async (stage) => {
      const out = stage.bar ? readout(el) : null;
      if (out) out.textContent = 'Click an icon.';
      const graph = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: hubData(),
          node: { style: { fill: '#7e3feb' } },
          edge: { style: { stroke: '#8b9baf' } },
          layout: { type: 'grid' },
          behaviors: ['drag-canvas', 'zoom-canvas'],
          autoFit: 'view',
          padding: [24, 24, 24, 56],
          plugins: [
            {
              type: 'toolbar',
              position: stage.preview ? 'left-top' : 'left-top',
              getItems: () => ICONS.map((id) => ({ id, value: id })),
              // Logging only: the icons do nothing on their own, the handler decides.
              onClick: (value: string) => {
                if (out) out.textContent = `onClick(${JSON.stringify(value)})`;
              },
            },
          ],
        }),
      );
      await graph.render();
    },
    { height: 520 },
  );

export default mount;
