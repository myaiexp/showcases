// XY chart config as live controls: chart options, per-axis AxisConfig keys and a plot colour palette
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// Keys with an axis prefix (xAxis., yAxis.) are AxisConfig entries nested under that axis.
const CONTROLS: Control[] = [
  { key: 'width', label: 'width', kind: 'range', min: 400, max: 900, step: 25 },
  { key: 'height', label: 'height', kind: 'range', min: 300, max: 700, step: 25 },
  { key: 'chartOrientation', label: 'chartOrientation', kind: 'select', options: ['vertical', 'horizontal'] },
  { key: 'showDataLabel', label: 'showDataLabel', kind: 'check' },
  { key: 'showDataLabelOutsideBar', label: 'showDataLabelOutsideBar', kind: 'check' },
  { key: 'showLegend', label: 'showLegend', kind: 'check' },
  { key: 'showTitle', label: 'showTitle', kind: 'check' },
  { key: 'plotReservedSpacePercent', label: 'plotReservedSpacePercent', kind: 'range', min: 30, max: 100, step: 5 },
  { key: 'xAxis.labelRotation', label: 'xAxis.labelRotation', kind: 'range', min: 0, max: 90, step: 15 },
  { key: 'xAxis.labelFontSize', label: 'xAxis.labelFontSize', kind: 'range', min: 8, max: 22 },
  { key: 'xAxis.showTick', label: 'xAxis.showTick', kind: 'check' },
  { key: 'xAxis.tickLength', label: 'xAxis.tickLength', kind: 'range', min: 0, max: 20 },
  { key: 'xAxis.showAxisLine', label: 'xAxis.showAxisLine', kind: 'check' },
  { key: 'yAxis.axisLineWidth', label: 'yAxis.axisLineWidth', kind: 'range', min: 0, max: 8 },
  { key: 'yAxis.showTitle', label: 'yAxis.showTitle', kind: 'check' },
  { key: 'yAxis.showLabel', label: 'yAxis.showLabel', kind: 'check' },
  { key: 'palette', label: 'plotColorPalette', kind: 'select', options: ['theme default', 'fire', 'ocean', 'mono'] },
];

// plotColorPalette is a comma-separated string; colours apply to bars and lines in series order.
const PALETTES: Record<string, string> = {
  fire: '#f97316, #ef4444, #fde047',
  ocean: '#38bdf8, #2dd4bf, #818cf8',
  mono: '#e5e7eb, #9ca3af, #6b7280',
};

const definition = (s: State): string => {
  const top = CONTROLS.filter((c) => !c.key.includes('.') && c.key !== 'palette');
  const axis = (name: string): string =>
    CONTROLS.filter((c) => c.key.startsWith(`${name}.`))
      .map((c) => `      ${c.key.slice(name.length + 1)}: ${s[c.key]}`)
      .join('\n');
  const palette = PALETTES[String(s.palette)];
  const theme = palette ? `  themeVariables:\n    xyChart:\n      plotColorPalette: '${palette}'\n` : '';
  return `---
config:
  xyChart:
${top.map((c) => `    ${c.key}: ${s[c.key]}`).join('\n')}
    xAxis:
${axis('xAxis')}
    yAxis:
${axis('yAxis')}
${theme}---
xychart
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar "Online" [5000, 6000, 7500, 8200, 9500, 10500]
    bar "Retail" [4500, 5200, 6100, 7300, 8000, 9100]
    line "Target" [5000, 6000, 7500, 8200, 9500, 10500]`;
};

const DEFAULTS: State = {
  width: 700,
  height: 500,
  chartOrientation: 'vertical',
  showDataLabel: false,
  showDataLabelOutsideBar: false,
  showLegend: true,
  showTitle: true,
  plotReservedSpacePercent: 50,
  'xAxis.labelRotation': 0,
  'xAxis.labelFontSize': 14,
  'xAxis.showTick': true,
  'xAxis.tickLength': 5,
  'xAxis.showAxisLine': true,
  'yAxis.axisLineWidth': 2,
  'yAxis.showTitle': true,
  'yAxis.showLabel': true,
  palette: 'theme default',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, showDataLabel: true, palette: 'fire' },
  { ...DEFAULTS, chartOrientation: 'horizontal', palette: 'ocean' },
  { ...DEFAULTS, 'xAxis.labelRotation': 45, 'xAxis.tickLength': 12, 'yAxis.axisLineWidth': 6, palette: 'mono' },
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
