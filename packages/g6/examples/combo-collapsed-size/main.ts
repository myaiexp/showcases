// collapsedSize as a number or [width, height] on collapsed circle and rect combos
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const comboOf = (w: number, h: number): ComboOptions => ({
  style: {
    // size is ignored while a combo has children (the children set the box), so the
    // collapsed box is what this value controls.
    collapsedSize: (d) => (d.id === 'round' ? w : [w, h]),
    collapsedMarker: false,
    fill: '#5B8FF9',
    fillOpacity: 0.3,
    stroke: '#5B8FF9',
    labelText: (d) => (d.id === 'round' ? `collapsedSize: ${w}` : `collapsedSize: [${w}, ${h}]`),
    labelFontSize: 11,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let w = 70;
    let h = 40;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'a1', combo: 'round', style: { x: 60, y: 90 } },
            { id: 'a2', combo: 'round', style: { x: 90, y: 110 } },
            { id: 'b1', combo: 'box', style: { x: 210, y: 90 } },
            { id: 'b2', combo: 'box', style: { x: 240, y: 110 } },
          ],
          combos: [
            { id: 'round', type: 'circle', style: { collapsed: true } },
            { id: 'box', type: 'rect', style: { collapsed: true } },
          ],
        },
        combo: comboOf(w, h),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(w, h));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'width (or number)', [20, 140, 1], w, (v) => ((w = v), void apply()));
      slider(stage.bar, 'height (rect only)', [20, 140, 1], h, (v) => ((h = v), void apply()));
    } else {
      const steps: [number, number][] = [[70, 40], [100, 60], [50, 90], [80, 80]];
      stage.every(1200, (i) => ([w, h] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
