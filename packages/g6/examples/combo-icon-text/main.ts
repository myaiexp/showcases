// Combo icon from text: iconText, iconFill, iconFontSize, iconFontWeight
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const comboOf = (text: string, fill: string, size: number): ComboOptions => ({
  style: { iconText: text, iconFill: fill, iconFontSize: size, iconFontWeight: 'bold', fill: '#999', fillOpacity: 0.12, stroke: '#aaa' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let text = 'A';
    let fill = '#1783FF';
    let size = 24;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        // An empty combo: the icon sits at its centre, as in the docs.
        data: { combos: [{ id: 'combo1', style: { x: 140, y: 90, collapsedSize: 90 } }] },
        combo: comboOf(text, fill, size),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(text, fill, size));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'iconText', ['A', 'Dept', '★', '42'], text, (v) => ((text = v), void apply()));
      select(stage.bar, 'iconFill', ['#1783FF', '#FF4D4F', '#52C41A'], fill, (v) => ((fill = v), void apply()));
      slider(stage.bar, 'iconFontSize', [8, 48, 1], size, (v) => ((size = v), void apply()));
    } else {
      const steps: [string, string, number][] = [['A', '#1783FF', 24], ['Dept', '#FF4D4F', 16], ['★', '#FFC53D', 36], ['42', '#52C41A', 28]];
      stage.every(1200, (i) => ([text, fill, size] = steps[i % steps.length]!, apply()));
    }
  });

export default mount;
