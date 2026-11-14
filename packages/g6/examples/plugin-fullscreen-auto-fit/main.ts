// fullscreen autoFit on or off, with the canvas size logged on enter and exit
import { Fullscreen, Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';
import { releaseFullscreen } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    const size = (label: string): void => {
      if (out) out.textContent = `${label}: canvas ${graph.getSize().map(Math.round).join(' x ')}`;
    };
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
        padding: 40,
        plugins: stage.preview
          ? [{ type: 'toolbar', position: 'top-right', getItems: () => [{ id: 'request-fullscreen', value: 'request' }] }]
          : [{ type: 'fullscreen', key: 'fs', autoFit: true, onEnter: () => size('onEnter'), onExit: () => size('onExit') }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      size('now');
      const fs = graph.getPluginInstance<Fullscreen>('fs');
      stage.onCleanup(() => releaseFullscreen(fs));
      toggle(stage.bar, 'autoFit', true, (autoFit) => graph.updatePlugin({ key: 'fs', autoFit }));
      button(stage.bar, 'request()', () => fs.request());
    } else {
      stage.every(1500, (i) => graph.zoomTo(i % 2 ? 1.25 : 0.85, { duration: 800 }));
    }
  });

export default mount;
