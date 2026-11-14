// background plugin with a CSS transition between two updatePlugin calls
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        background: 'transparent',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'background', key: 'bg', backgroundColor: '#12263f' }],
      }),
    );
    await graph.render();

    let warm = false;
    const flip = (): void => {
      warm = !warm;
      // A slower transition than the default `background 0.5s`.
      graph.updatePlugin({
        key: 'bg',
        backgroundColor: warm ? '#5a2a1c' : '#12263f',
        transition: 'background 1.5s ease',
      });
    };
    if (stage.bar) button(stage.bar, 'update background', flip);
    else stage.every(2000, flip);
  });

export default mount;
