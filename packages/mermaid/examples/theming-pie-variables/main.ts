// Live inputs for the Pie Diagram Variables from theming.md on the base theme
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// pie1..pie12 are the slice fills in order; the rest style the title, labels, legend and borders.
const COLOR_KEYS = ['pie1', 'pie2', 'pie3', 'pie4', 'pie5', 'pie6', 'pie7', 'pie8', 'pie9', 'pie10', 'pie11', 'pie12', 'pieTitleTextColor', 'pieSectionTextColor', 'pieLegendTextColor', 'pieStrokeColor', 'pieOuterStrokeColor'];

const CONTROLS: Control[] = [
  { key: 'pieOpacity', label: 'pieOpacity', kind: 'range', min: 0.1, max: 1, step: 0.1 },
  { key: 'pieStrokeWidth', label: 'pieStrokeWidth (px)', kind: 'range', min: 0, max: 10 },
  { key: 'pieOuterStrokeWidth', label: 'pieOuterStrokeWidth (px)', kind: 'range', min: 0, max: 12 },
  { key: 'pieTitleTextSize', label: 'pieTitleTextSize (px)', kind: 'range', min: 14, max: 40 },
  { key: 'pieSectionTextSize', label: 'pieSectionTextSize (px)', kind: 'range', min: 10, max: 28 },
  { key: 'pieLegendTextSize', label: 'pieLegendTextSize (px)', kind: 'range', min: 10, max: 28 },
  ...COLOR_KEYS.map((key): Control => ({ key, label: key, kind: 'color' })),
];

// Only variables whose box is ticked are written, so the rest stay derived from primaryColor
// (theming.md, Color and Color Calculation). theme: base is the one modifiable theme.
const definition = (s: State): string => {
  const colours = COLOR_KEYS.filter((k) => s[`${k}?`]).map((k) => `    ${k}: "${s[k]}"`);
  return `---
config:
  theme: base
  themeVariables:
    pieOpacity: ${s.pieOpacity}
    pieStrokeWidth: "${s.pieStrokeWidth}px"
    pieOuterStrokeWidth: "${s.pieOuterStrokeWidth}px"
    pieTitleTextSize: "${s.pieTitleTextSize}px"
    pieSectionTextSize: "${s.pieSectionTextSize}px"
    pieLegendTextSize: "${s.pieLegendTextSize}px"
${colours.join('\n')}
---
pie showData
  title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 70
  "Birds" : 55
  "Rabbits" : 40
  "Fish" : 30
  "Lizards" : 20
  "Hamsters" : 15`;
};

const COLOURS: Record<string, string> = {
  pie1: '#f97316',
  pie2: '#eab308',
  pie3: '#22c55e',
  pie4: '#06b6d4',
  pie5: '#6366f1',
  pie6: '#ec4899',
  pie7: '#a855f7',
  pie8: '#14b8a6',
  pie9: '#84cc16',
  pie10: '#f43f5e',
  pie11: '#0ea5e9',
  pie12: '#d946ef',
  pieTitleTextColor: '#f8fafc',
  pieSectionTextColor: '#111827',
  pieLegendTextColor: '#e5e7eb',
  pieStrokeColor: '#0f172a',
  pieOuterStrokeColor: '#94a3b8',
};

const DEFAULTS: State = { pieOpacity: 0.7, pieStrokeWidth: 2, pieOuterStrokeWidth: 2, pieTitleTextSize: 25, pieSectionTextSize: 17, pieLegendTextSize: 17, ...COLOURS };
for (const k of ['pie1', 'pie2', 'pie3', 'pie4', 'pieTitleTextColor', 'pieSectionTextColor', 'pieLegendTextColor']) DEFAULTS[`${k}?`] = true;

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, pieOpacity: 1, pieStrokeWidth: 4, 'pieStrokeColor?': true, pieStrokeColor: '#ffffff' },
  { ...DEFAULTS, pie1: '#38bdf8', pie2: '#818cf8', pie3: '#c084fc', pie4: '#f472b6', pieOpacity: 0.9, 'pieOuterStrokeColor?': true, pieOuterStrokeWidth: 6 },
  { ...DEFAULTS, pie1: '#16a34a', pie2: '#65a30d', pie3: '#ca8a04', pie4: '#ea580c', pieTitleTextSize: 32, pieSectionTextSize: 14 },
];

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  const state: State = { ...DEFAULTS };
  const { draw, stop } = makeDrawer(() => definition(state), box, signal, report);
  let timer = 0;

  if (preview) {
    let i = 0;
    timer = window.setInterval(() => {
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, PRESETS[++i % PRESETS.length]);
      void draw();
    }, 2600);
  } else {
    const row = document.createElement('div');
    row.className = 'mm-row';
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
