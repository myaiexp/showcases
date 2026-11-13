// Pie chart config as live controls: donutHole, legendPosition, highlightSlice and textPosition
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const SLICES = ['Calcium', 'Potassium', 'Magnesium', 'Iron'];

const CONTROLS: Control[] = [
  { key: 'donutHole', label: 'donutHole', kind: 'range', min: 0, max: 0.9, step: 0.05 },
  { key: 'textPosition', label: 'textPosition', kind: 'range', min: 0, max: 1, step: 0.05 },
  { key: 'legendPosition', label: 'legendPosition', kind: 'select', options: ['right', 'left', 'top', 'bottom', 'center'] },
  { key: 'highlightSlice', label: 'highlightSlice', kind: 'select', options: ['', 'hover', ...SLICES] },
];

// The definition is plain frontmatter: pie: holds the three config keys the docs list, and
// highlightSlice is left out when empty. The diagram data stays fixed.
const definition = (s: State): string => `---
config:
  pie:
    textPosition: ${s.textPosition}
    donutHole: ${s.donutHole}
    legendPosition: ${s.legendPosition}${s.highlightSlice ? `\n    highlightSlice: ${s.highlightSlice}` : ''}
---
pie showData
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" : 5`;

// Presets a card walks through, since it has no input: pie, donut, highlight, left legend.
const PRESETS: State[] = [
  { donutHole: 0, textPosition: 0.75, legendPosition: 'right', highlightSlice: '' },
  { donutHole: 0.5, textPosition: 0.75, legendPosition: 'right', highlightSlice: '' },
  { donutHole: 0.3, textPosition: 0.5, legendPosition: 'bottom', highlightSlice: 'Potassium' },
  { donutHole: 0.6, textPosition: 0.8, legendPosition: 'left', highlightSlice: 'Iron' },
];

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  const state: State = { ...PRESETS[0]! };
  const { draw, stop } = makeDrawer(() => definition(state), box, signal, report);
  let timer = 0;

  if (preview) {
    let i = 0;
    timer = window.setInterval(() => {
      Object.assign(state, PRESETS[++i % PRESETS.length]);
      void draw();
    }, 2200);
  } else {
    const row = document.createElement('div');
    row.className = 'mm-row';
    state.highlightSlice = 'Potassium';
    state.donutHole = 0.2;
    buildControls(row, CONTROLS, state, () => void draw());
    el.insertBefore(row, box);
  }
  void draw();
  return () => {
    stop();
    clearInterval(timer);
  };
};

export default mount;
