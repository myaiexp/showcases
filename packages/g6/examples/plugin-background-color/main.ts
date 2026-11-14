// background plugin with a backgroundColor, behind a transparent canvas
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const COLOURS = ['#12263f', '#2d1f4d', '#1e3b32', '#4a2a2a'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        // The dark theme paints the canvas opaque black, which would hide the plugin's
        // layer behind it: a transparent canvas lets the colour through.
        background: 'transparent',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'background', key: 'bg', backgroundColor: COLOURS[0] }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      select(stage.bar, 'backgroundColor', COLOURS, COLOURS[0]!, (backgroundColor) =>
        graph.updatePlugin({ key: 'bg', backgroundColor }),
      );
    } else {
      stage.every(1300, (i) => graph.updatePlugin({ key: 'bg', backgroundColor: COLOURS[i % COLOURS.length] }));
    }
  });

export default mount;
