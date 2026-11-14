// watermark plugin: font family, weight, alignment and repeat mode
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
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
        plugins: [
          {
            type: 'watermark',
            key: 'wm',
            text: 'G6 Graph',
            textFontSize: 20,
            textFontFamily: 'Arial',
            textFontWeight: 'bold',
            textFill: '#4da3ff',
            rotate: Math.PI / 6,
            opacity: 0.3,
            width: 180,
            height: 100,
            backgroundRepeat: 'space',
            backgroundPosition: 'center',
            textAlign: 'center',
            textBaseline: 'middle',
          },
        ],
      }),
    );
    await graph.render();

    const repeats = ['space', 'repeat', 'round', 'repeat-x', 'repeat-y', 'no-repeat'];
    if (stage.bar) {
      select(stage.bar, 'backgroundRepeat', repeats, 'space', (backgroundRepeat) =>
        graph.updatePlugin({ key: 'wm', backgroundRepeat }),
      );
      select(stage.bar, 'textAlign', ['center', 'left', 'right'], 'center', (textAlign) =>
        graph.updatePlugin({ key: 'wm', textAlign }),
      );
    } else {
      stage.every(1200, (i) => graph.updatePlugin({ key: 'wm', backgroundRepeat: repeats[i % repeats.length] }));
    }
  });

export default mount;
