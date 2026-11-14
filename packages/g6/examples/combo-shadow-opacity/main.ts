// Combo opacity, strokeOpacity and shadow settings
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const comboOf = (opacity: number, blur: number, dy: number): ComboOptions => ({
  style: {
    fill: '#61DDAA',
    fillOpacity: 0.15,
    opacity,
    shadowColor: 'rgba(97, 221, 170, 0.8)',
    shadowBlur: blur,
    shadowOffsetX: 2,
    shadowOffsetY: dy,
    stroke: '#F0F0F0',
    lineWidth: 1,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let opacity = 1;
    let blur = 12;
    let dy = 4;
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 24, data: single(), combo: comboOf(opacity, blur, dy) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(opacity, blur, dy));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'opacity', [0, 1, 0.05], opacity, (v) => ((opacity = v), void apply()));
      slider(stage.bar, 'shadowBlur', [0, 40, 1], blur, (v) => ((blur = v), void apply()));
      slider(stage.bar, 'shadowOffsetY', [-20, 20, 1], dy, (v) => ((dy = v), void apply()));
    } else {
      stage.every(1200, (i) => ((blur = [4, 20, 36][i % 3]!), (dy = [2, 8, -8][i % 3]!), (opacity = i % 4 === 3 ? 0.5 : 1), apply()));
    }
  });

export default mount;
