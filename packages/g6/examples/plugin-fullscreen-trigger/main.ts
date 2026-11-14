// fullscreen trigger keys (F to enter); cards only show a hint
import { Fullscreen, Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';
import { bindFullscreenKeys, releaseFullscreen } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    if (out) out.textContent = 'Click the canvas, then press F to enter fullscreen. Esc leaves it.';
    const hint = { key: 'hint', type: 'title', title: 'Press F for fullscreen', subtitle: 'Esc to exit', titleFill: '#ffffff', subtitleFill: '#9fb3d1', size: 40 };
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
        padding: [56, 24, 24, 24],
        plugins: stage.preview
          ? [hint]
          : [
              hint,
              {
                type: 'fullscreen',
                key: 'fs',
                // Key lists, matched against the keys held down on the canvas.
                trigger: { request: ['f'], exit: ['Escape'] },
                onEnter: () => out && (out.textContent = 'onEnter: fullscreen'),
                onExit: () => out && (out.textContent = 'onExit: back in the page'),
              },
            ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      const fs = graph.getPluginInstance<Fullscreen>('fs');
      bindFullscreenKeys(graph, 'fs', fs);
      stage.onCleanup(() => releaseFullscreen(fs));
    } else {
      stage.every(1200, (i) => graph.updatePlugin({ key: 'hint', title: i % 2 ? 'Press F for fullscreen' : 'Press Esc to leave' }));
    }
  });

export default mount;
