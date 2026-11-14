// background plugin fed a CSS gradient through the `background` shorthand
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const gradient = (deg: number): string => `linear-gradient(${deg}deg, #1890ff, #722ed1)`;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        background: 'transparent',
        data: hubData(),
        node: { style: { fill: '#ffd666', stroke: '#000', lineWidth: 1 } },
        edge: { style: { stroke: '#ffffffaa' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'background', key: 'bg', background: gradient(45), opacity: '0.8' }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      slider(stage.bar, 'angle', [0, 360, 5], 45, (deg) => graph.updatePlugin({ key: 'bg', background: gradient(deg) }));
    } else {
      stage.every(500, (i) => graph.updatePlugin({ key: 'bg', background: gradient((45 + i * 30) % 360) }));
    }
  });

export default mount;
