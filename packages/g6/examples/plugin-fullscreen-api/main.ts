// fullscreen driven by buttons; request() only from a click, never in a card
import { Fullscreen, Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';
import { releaseFullscreen } from '../../shared/plugin-drive.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    if (out) out.textContent = 'Not fullscreen.';
    const toolbar = {
      type: 'toolbar',
      position: 'top-right',
      getItems: () => [
        { id: 'request-fullscreen', value: 'request' },
        { id: 'exit-fullscreen', value: 'exit' },
      ],
      // Toolbar clicks are user gestures too, so the browser allows request() here.
      onClick: (value: string) => {
        const fs = graph.getPluginInstance<Fullscreen>('fs');
        if (value === 'request') fs.request();
        else fs.exit();
      },
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
        // A card never gets the fullscreen plugin: it has no pointer and must not call request().
        plugins: stage.preview
          ? [toolbar]
          : [
              {
                type: 'fullscreen',
                key: 'fs',
                onEnter: () => out && (out.textContent = 'onEnter: fullscreen'),
                onExit: () => out && (out.textContent = 'onExit: back in the page'),
              },
              toolbar,
            ],
      }),
    );
    await graph.render();

    if (stage.bar) {
      const fs = (): Fullscreen => graph.getPluginInstance<Fullscreen>('fs');
      stage.onCleanup(() => releaseFullscreen(fs()));
      button(stage.bar, 'request()', () => fs().request());
      button(stage.bar, 'exit()', () => fs().exit());
    } else {
      stage.every(1400, (i) => graph.translateBy([i % 2 ? 24 : -24, 0], { duration: 900 }));
    }
  });

export default mount;
