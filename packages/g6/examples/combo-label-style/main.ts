// Combo label text style: colour, weight, italic, underline and letter spacing
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

interface Opts {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  spacing: number;
}
const comboOf = (o: Opts): ComboOptions => ({
  style: {
    padding: 20,
    fill: '#FF4D4F',
    fillOpacity: 0.1,
    labelText: 'IMPORTANT',
    labelFill: '#FF7875',
    labelFontSize: 16,
    labelFontWeight: o.bold ? 'bold' : 'normal',
    labelFontStyle: o.italic ? 'italic' : 'normal',
    labelTextDecorationLine: o.underline ? 'underline' : 'none',
    labelLetterSpacing: o.spacing,
    labelPlacement: 'top',
  },
});
const STEPS: Opts[] = [
  { bold: true, italic: true, underline: true, spacing: 2 },
  { bold: false, italic: false, underline: false, spacing: 0 },
  { bold: true, italic: false, underline: false, spacing: 8 },
  { bold: false, italic: true, underline: true, spacing: 0 },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o = { ...STEPS[0]! };
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 28, data: single(), combo: comboOf(o) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'bold', o.bold, (v) => ((o.bold = v), void apply()));
      toggle(stage.bar, 'italic', o.italic, (v) => ((o.italic = v), void apply()));
      toggle(stage.bar, 'underline', o.underline, (v) => ((o.underline = v), void apply()));
      slider(stage.bar, 'labelLetterSpacing', [0, 16, 1], o.spacing, (v) => ((o.spacing = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
