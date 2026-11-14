// A fully styled combo badge: background fill, text colour, padding, radius and offset
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const comboOf = (radius: number, dx: number): ComboOptions => ({
  style: {
    padding: 24,
    fill: '#1783FF',
    fillOpacity: 0.12,
    badges: [
      {
        text: '99+',
        placement: 'right-top',
        backgroundFill: '#FF4D4F',
        fill: '#fff',
        fontSize: 10,
        padding: [2, 6],
        backgroundRadius: radius,
        offsetX: dx,
      },
    ],
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let radius = 8;
    let dx = 0;
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 50, data: single(), combo: comboOf(radius, dx) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(radius, dx));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'backgroundRadius', [0, 20, 1], radius, (v) => ((radius = v), void apply()));
      slider(stage.bar, 'offsetX', [-30, 30, 1], dx, (v) => ((dx = v), void apply()));
    } else {
      stage.every(1200, (i) => ((radius = i % 2 ? 0 : 10), (dx = [0, 12, -12][i % 3]!), apply()));
    }
  });

export default mount;
