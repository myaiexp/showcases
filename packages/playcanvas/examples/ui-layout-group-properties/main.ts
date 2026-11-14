// Layout group: orientation, fitting, wrap, alignment, spacing and padding
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, createUi, every, COL } from '../../shared/ui.ts';

const FITS = ['none', 'stretch', 'shrink', 'both'] as const;
const FIT = { none: pc.FITTING_NONE, stretch: pc.FITTING_STRETCH, shrink: pc.FITTING_SHRINK, both: pc.FITTING_BOTH };
const TINTS = [COL.accent, COL.blue, COL.green, COL.red, '#a78bfa', '#f2c14e'];

interface Config {
  vertical: boolean;
  w: (typeof FITS)[number];
  h: (typeof FITS)[number];
  wrap: boolean;
  spacing: number;
  padding: number;
  alignment: [number, number];
}
const CONFIGS: Config[] = [
  { vertical: true, w: 'stretch', h: 'none', wrap: false, spacing: 8, padding: 10, alignment: [0, 1] },
  { vertical: false, w: 'stretch', h: 'stretch', wrap: false, spacing: 8, padding: 10, alignment: [0, 0.5] },
  { vertical: false, w: 'none', h: 'none', wrap: true, spacing: 10, padding: 0, alignment: [0.5, 1] },
  { vertical: true, w: 'none', h: 'none', wrap: true, spacing: 14, padding: 16, alignment: [0, 1] },
];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  addElement(ui.screen, 'backdrop', { width: 420, height: 280, color: color(COL.panel) });
  const list = addGroup(ui.screen, 'list', { width: 420, height: 280 });
  list.addComponent('layoutgroup', { orientation: pc.ORIENTATION_VERTICAL, widthFitting: pc.FITTING_STRETCH });
  const group = list.layoutgroup!;
  // Children only say how big they would like to be; the layout group sets anchor and position.
  TINTS.forEach((tint, i) => {
    const item = addElement(list, `item ${i + 1}`, { width: 110, height: 56, color: color(tint) });
    addText(ui, item, String(i + 1), { fontSize: 28, color: color('#161820') });
  });

  const apply = (c: Config): void => {
    group.orientation = c.vertical ? pc.ORIENTATION_VERTICAL : pc.ORIENTATION_HORIZONTAL;
    group.widthFitting = FIT[c.w];
    group.heightFitting = FIT[c.h];
    group.wrap = c.wrap;
    group.spacing = new pc.Vec2(c.spacing, c.spacing);
    group.padding = new pc.Vec4(c.padding, c.padding, c.padding, c.padding);
    group.alignment = new pc.Vec2(...c.alignment);
  };
  const current: Config = { ...CONFIGS[0]! };
  apply(current);

  let auto = true;
  every(ui.app, 2.6, (n) => {
    if (!auto) return;
    Object.assign(current, CONFIGS[n % CONFIGS.length]!);
    apply(current);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const set = <K extends keyof Config>(key: K, value: Config[K]): void => {
      auto = false;
      current[key] = value;
      apply(current);
    };
    panel.select('orientation', ['Vertical', 'Horizontal'] as const, 'Vertical', (v) => set('vertical', v === 'Vertical'));
    panel.select('width fitting', FITS, 'stretch', (v) => set('w', v));
    panel.select('height fitting', FITS, 'none', (v) => set('h', v));
    panel.check('wrap', false, (on) => set('wrap', on));
    panel.row();
    panel.slider('spacing', 0, 30, 1, 8, (v) => set('spacing', v));
    panel.slider('padding', 0, 40, 1, 10, (v) => set('padding', v));
    panel.slider('alignment x', 0, 1, 0.5, 0, (v) => set('alignment', [v, current.alignment[1]]));
    panel.slider('alignment y', 0, 1, 0.5, 1, (v) => set('alignment', [current.alignment[0], v]));
    panel.button('Cycle presets', () => (auto = true));
  }

  return () => ui.dispose();
};

export default mount;
