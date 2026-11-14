// Combo padding: the space between the children and the combo border
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const SHAPES = ['circle', 'rect'] as const;
const comboOf = (padding: number, type: (typeof SHAPES)[number]): ComboOptions => ({
  type,
  style: { padding, labelText: `padding ${padding}`, fill: '#13C2C2', fillOpacity: 0.15, stroke: '#13C2C2' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let padding = 10;
    let type: (typeof SHAPES)[number] = 'rect';
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 24, data: single(), combo: comboOf(padding, type) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(padding, type));
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'padding', [0, 60, 1], padding, (v) => ((padding = v), void apply()));
      select(stage.bar, 'type', SHAPES, type, (v) => ((type = v), void apply()));
    } else {
      stage.every(1100, (i) => ((padding = [10, 40, 0, 25][i % 4]!), apply()));
    }
  });

export default mount;
