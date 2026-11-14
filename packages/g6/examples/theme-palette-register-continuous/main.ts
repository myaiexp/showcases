// A continuous palette is a function from 0..1 to a colour: register it and name it in node.palette
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// A hue sweep from cyan (0) to magenta (1); registering does not say discrete or continuous.
register(ExtensionCategory.PALETTE, 'showcase-theme-hue-sweep', (t: number) => `hsl(${180 + t * 140}, 85%, 60%)`);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const values = (shift: number) => Array.from({ length: 8 }, (_, i) => ({ id: `node-${i}`, data: { value: i * 10 + shift } }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes: values(0) },
        layout: { type: 'grid', cols: 8 },
        node: {
          style: { size: 26, labelText: (d) => String(d.data?.value), labelFontSize: 10, labelPlacement: 'bottom' },
          palette: { type: 'value', field: 'value', color: 'showcase-theme-hue-sweep' },
        },
      }),
    );
    await graph.render();

    // The ramp stretches over the data's own min and max, so adding a far outlier squeezes the rest.
    const setOutlier = async (extra: number): Promise<void> => {
      const nodes = values(0);
      nodes[7]!.data.value = 70 + extra;
      graph.setData({ nodes });
      await graph.render();
    };
    if (stage.bar) slider(stage.bar, 'last node value', [70, 400, 5], 70, (v) => void setOutlier(v - 70));
    else stage.every(1400, (i) => setOutlier(i % 2 ? 300 : 0));
  });

export default mount;
