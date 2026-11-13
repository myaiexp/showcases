// Treemap config as live controls: paddings, node size, borders, fonts and the theme
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const CONTROLS: Control[] = [
  { key: 'padding', label: 'padding', kind: 'range', min: 0, max: 40 },
  { key: 'diagramPadding', label: 'diagramPadding', kind: 'range', min: 0, max: 120, step: 4 },
  { key: 'showValues', label: 'showValues', kind: 'check' },
  { key: 'nodeWidth', label: 'nodeWidth', kind: 'range', min: 40, max: 200, step: 10 },
  { key: 'nodeHeight', label: 'nodeHeight', kind: 'range', min: 20, max: 100, step: 5 },
  { key: 'borderWidth', label: 'borderWidth', kind: 'range', min: 0, max: 8 },
  { key: 'valueFontSize', label: 'valueFontSize', kind: 'range', min: 8, max: 24 },
  { key: 'labelFontSize', label: 'labelFontSize', kind: 'range', min: 8, max: 26 },
  { key: 'theme', label: 'theme', kind: 'select', options: ['dark', 'forest', 'default', 'neutral', 'base'] },
];

// theme is a top-level key, the rest sit under treemap:. A theme in frontmatter outranks the site's dark one.
const definition = (s: State): string => `---
config:
  theme: '${s.theme}'
  treemap:
${CONTROLS.filter((c) => c.key !== 'theme')
  .map((c) => `    ${c.key}: ${s[c.key]}`)
  .join('\n')}
---
treemap-beta
"Category A"
    "Item A1": 10
    "Item A2": 20
    "Item A3": 8
"Category B"
    "Item B1": 15
    "Item B2": 25
"Category C"
    "Item C1": 12`;

const DEFAULTS: State = {
  padding: 10,
  diagramPadding: 8,
  showValues: true,
  nodeWidth: 100,
  nodeHeight: 40,
  borderWidth: 1,
  valueFontSize: 12,
  labelFontSize: 14,
  theme: 'dark',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, padding: 24, borderWidth: 4, theme: 'forest' },
  { ...DEFAULTS, diagramPadding: 80, showValues: false, theme: 'neutral' },
  { ...DEFAULTS, labelFontSize: 20, valueFontSize: 16, padding: 4, theme: 'base' },
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
