// graph.setSize stores the size in the options, unlike a one-off resize
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 60, 50),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
        plugins: [{ type: 'grid-line', follow: false }],
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const set = (w: number, h: number) => {
      graph.setSize(w, h);
      show(`setSize(${w}, ${h})  getSize() ${graph.getSize().join(' x ')}`);
    };
    show(`getSize() ${graph.getSize().join(' x ')}`);

    if (stage.bar) {
      let w = 500;
      let h = 320;
      slider(stage.bar, 'width', [200, 900, 20], w, (v) => set((w = v), h));
      slider(stage.bar, 'height', [150, 560, 10], h, (v) => set(w, (h = v)));
      button(stage.bar, 'back to the container', () => graph.resize());
    } else {
      const sizes: [number, number][] = [[150, 110], [230, 190], [260, 130]];
      stage.every(1300, (i) => set(...sizes[i % sizes.length]!));
    }
  });

export default mount;
