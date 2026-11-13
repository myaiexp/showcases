// Radar chart live controls: diagram options in the body, radar config keys and themeVariables.radar
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// Three groups: o.* are options written inside the diagram, c.* go under config.radar and
// t.* under themeVariables.radar.
const CONTROLS: Control[] = [
  { key: 'o.showLegend', label: 'showLegend', kind: 'check' },
  { key: 'o.graticule', label: 'graticule', kind: 'select', options: ['circle', 'polygon'] },
  { key: 'o.ticks', label: 'ticks', kind: 'range', min: 1, max: 10 },
  { key: 'o.max', label: 'max', kind: 'range', min: 60, max: 200, step: 10 },
  { key: 'o.min', label: 'min', kind: 'range', min: 0, max: 50, step: 5 },
  { key: 'c.width', label: 'width', kind: 'range', min: 300, max: 800, step: 25 },
  { key: 'c.height', label: 'height', kind: 'range', min: 300, max: 800, step: 25 },
  { key: 'c.axisScaleFactor', label: 'axisScaleFactor', kind: 'range', min: 0.25, max: 1, step: 0.05 },
  { key: 'c.axisLabelFactor', label: 'axisLabelFactor', kind: 'range', min: 1, max: 1.4, step: 0.05 },
  { key: 'c.curveTension', label: 'curveTension', kind: 'range', min: 0, max: 0.5, step: 0.01 },
  { key: 't.curveOpacity', label: 'curveOpacity', kind: 'range', min: 0, max: 1, step: 0.1 },
  { key: 't.curveStrokeWidth', label: 'curveStrokeWidth', kind: 'range', min: 1, max: 8 },
  { key: 't.graticuleOpacity', label: 'graticuleOpacity', kind: 'range', min: 0, max: 1, step: 0.1 },
  { key: 't.legendBoxSize', label: 'legendBoxSize', kind: 'range', min: 6, max: 30 },
  { key: 't.lines', label: 'axisColor + graticuleColor', kind: 'select', options: ['#94a3b8', '#e2e8f0', '#38bdf8', '#f97316'] },
];

const group = (prefix: string, s: State, indent: string): string =>
  CONTROLS.filter((c) => c.key.startsWith(`${prefix}.`) && c.key !== 't.lines')
    .map((c) => `${indent}${c.key.slice(2)}: ${s[c.key]}`)
    .join('\n');

// cScale0 and cScale1 are the curve colours (Global Theme Variables); the dark theme's own are near black.
const definition = (s: State): string => `---
config:
  radar:
${group('c', s, '    ')}
  themeVariables:
    cScale0: "#38bdf8"
    cScale1: "#f472b6"
    radar:
${group('t', s, '      ')}
      axisColor: "${s['t.lines']}"
      graticuleColor: "${s['t.lines']}"
---
radar-beta
  title Skills profile
  axis design["Design"], code["Code"], test["Testing"], ops["Operations"], talk["Communication"]
  curve ana["Ana"]{80, 60, 50, 40, 90}
  curve ben["Ben"]{40, 90, 70, 60, 50}
  showLegend ${s['o.showLegend']}
  graticule ${s['o.graticule']}
  ticks ${s['o.ticks']}
  max ${s['o.max']}
  min ${s['o.min']}`;

// Documented defaults. axisScaleFactor and curveTension are 1 and 0.17 by default.
const DEFAULTS: State = {
  'o.showLegend': true,
  'o.graticule': 'circle',
  'o.ticks': 5,
  'o.max': 100,
  'o.min': 0,
  'c.width': 600,
  'c.height': 600,
  'c.axisScaleFactor': 1,
  'c.axisLabelFactor': 1.05,
  'c.curveTension': 0.17,
  't.curveOpacity': 0.7,
  't.curveStrokeWidth': 2,
  't.graticuleOpacity': 0.5,
  't.legendBoxSize': 10,
  't.lines': '#94a3b8',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, 'o.graticule': 'polygon', 'o.ticks': 4, 't.lines': '#38bdf8' },
  { ...DEFAULTS, 'c.axisScaleFactor': 0.6, 'c.curveTension': 0.4, 't.curveOpacity': 0.3 },
  { ...DEFAULTS, 'o.min': 30, 'o.ticks': 7, 't.curveStrokeWidth': 5, 't.lines': '#f97316' },
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
