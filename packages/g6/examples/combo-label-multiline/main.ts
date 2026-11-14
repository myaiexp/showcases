// A long combo label wrapped with labelWordWrap, labelMaxWidth and labelMaxLines
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

const comboOf = (wrap: boolean, width: number, lines: number): ComboOptions => ({
  style: {
    padding: 20,
    labelText: 'This is a combo label text content that supports multi-line display',
    labelWordWrap: wrap,
    labelMaxWidth: width,
    labelMaxLines: lines,
    labelTextAlign: 'center',
    labelFontSize: 12,
    fill: '#1783FF',
    fillOpacity: 0.12,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let wrap = true;
    let width = 100;
    let lines = 3;
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 24, data: single(), combo: comboOf(wrap, width, lines) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(wrap, width, lines));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'labelWordWrap', wrap, (v) => ((wrap = v), void apply()));
      slider(stage.bar, 'labelMaxWidth', [40, 300, 5], width, (v) => ((width = v), void apply()));
      slider(stage.bar, 'labelMaxLines', [1, 6, 1], lines, (v) => ((lines = v), void apply()));
    } else {
      const steps: [boolean, number, number][] = [[true, 100, 3], [true, 60, 5], [true, 150, 2], [false, 100, 1]];
      stage.every(1400, (i) => ([wrap, width, lines] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
