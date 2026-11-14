// background plugin with an image, sized and dimmed with CSS-style options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { picture } from '../../shared/images.ts';
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
        plugins: [
          {
            type: 'background',
            key: 'bg',
            // The docs link a remote picture; a generated data URL needs no request.
            backgroundImage: `url("${picture(0)}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 0.5,
          },
        ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'backgroundSize', ['cover', 'contain', 'auto', '50%'], 'cover', (backgroundSize) =>
        graph.updatePlugin({ key: 'bg', backgroundSize }),
      );
      slider(stage.bar, 'opacity', [0, 1, 0.05], 0.5, (opacity) => graph.updatePlugin({ key: 'bg', opacity }));
    } else {
      stage.every(1400, (i) => graph.updatePlugin({ key: 'bg', backgroundImage: `url("${picture(i)}")` }));
    }
  });

export default mount;
