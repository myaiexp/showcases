// watermark plugin updated live from sliders and a text field
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
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
          { type: 'watermark', key: 'wm', text: 'G6: Graph Visualization', textFill: '#ffffff', opacity: 0.2, width: 200, height: 100 },
        ],
      }),
    );
    await graph.render();

    const update = (opts: Record<string, unknown>): void => graph.updatePlugin({ key: 'wm', ...opts });
    if (stage.bar) {
      slider(stage.bar, 'width', [60, 400, 10], 200, (width) => update({ width }));
      slider(stage.bar, 'height', [40, 300, 10], 100, (height) => update({ height }));
      slider(stage.bar, 'opacity', [0, 1, 0.05], 0.2, (opacity) => update({ opacity }));
      slider(stage.bar, 'rotate', [0, 6.28, 0.26], 0.26, (rotate) => update({ rotate }));
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.value = 'G6: Graph Visualization';
      input.addEventListener('input', () => update({ text: input.value }));
      label.append('text', input);
      stage.bar.append(label);
    } else {
      const texts = ['G6: Graph Visualization', 'Draft', 'Internal'];
      stage.every(1200, (i) => update({ text: texts[i % texts.length], opacity: 0.12 + (i % 3) * 0.08 }));
    }
  });

export default mount;
