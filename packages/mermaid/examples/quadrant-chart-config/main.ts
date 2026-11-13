// Quadrant chart config keys and theme variables driven by live controls; a card steps through presets
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const CONTROLS: Control[] = [
  { key: 'chartWidth', label: 'chartWidth', kind: 'range', min: 300, max: 700, step: 20 },
  { key: 'chartHeight', label: 'chartHeight', kind: 'range', min: 300, max: 700, step: 20 },
  { key: 'titleFontSize', label: 'titleFontSize', kind: 'range', min: 12, max: 32 },
  { key: 'quadrantLabelFontSize', label: 'quadrantLabelFontSize', kind: 'range', min: 10, max: 26 },
  { key: 'pointRadius', label: 'pointRadius', kind: 'range', min: 2, max: 16 },
  { key: 'pointLabelFontSize', label: 'pointLabelFontSize', kind: 'range', min: 8, max: 20 },
  { key: 'quadrantInternalBorderStrokeWidth', label: 'internal border', kind: 'range', min: 0, max: 8 },
  { key: 'quadrantExternalBorderStrokeWidth', label: 'external border', kind: 'range', min: 0, max: 8 },
  { key: 'xAxisPosition', label: 'xAxisPosition', kind: 'select', options: ['top', 'bottom'] },
  { key: 'yAxisPosition', label: 'yAxisPosition', kind: 'select', options: ['left', 'right'] },
  { key: 'palette', label: 'theme variables', kind: 'select', options: ['theme default', 'warm', 'cool', 'traffic light'] },
];

// Quadrant 1 is top right, 2 top left, 3 bottom left, 4 bottom right. Each palette sets the four
// quadrantNFill variables, the matching quadrantNTextFill, and the point colours.
const PALETTES: Record<string, string[]> = {
  warm: ['#7c2d12', '#9a3412', '#78350f', '#713f12', '#ffedd5', '#fb923c'],
  cool: ['#1e3a8a', '#1e40af', '#164e63', '#134e4a', '#dbeafe', '#38bdf8'],
  'traffic light': ['#166534', '#854d0e', '#7f1d1d', '#374151', '#f9fafb', '#fde047'],
};

const themeBlock = (palette: string): string => {
  const p = PALETTES[palette];
  if (!p) return '';
  const [q1, q2, q3, q4, text, point] = p;
  return `  themeVariables:
    quadrant1Fill: "${q1}"
    quadrant2Fill: "${q2}"
    quadrant3Fill: "${q3}"
    quadrant4Fill: "${q4}"
    quadrant1TextFill: "${text}"
    quadrant2TextFill: "${text}"
    quadrant3TextFill: "${text}"
    quadrant4TextFill: "${text}"
    quadrantPointFill: "${point}"
    quadrantPointTextFill: "${text}"
`;
};

const definition = (s: State): string => `---
config:
  quadrantChart:
${CONTROLS.filter((c) => c.key !== 'palette')
  .map((c) => `    ${c.key}: ${s[c.key]}`)
  .join('\n')}
${themeBlock(String(s.palette))}---
quadrantChart
  title Reach and engagement of campaigns
  x-axis Low Reach --> High Reach
  y-axis Low Engagement --> High Engagement
  quadrant-1 We should expand
  quadrant-2 Need to promote
  quadrant-3 Re-evaluate
  quadrant-4 May be improved
  Campaign A: [0.3, 0.6]
  Campaign B: [0.45, 0.23]
  Campaign C: [0.57, 0.69]
  Campaign D: [0.78, 0.34]
  Campaign E: [0.40, 0.34]
  Campaign F: [0.35, 0.78]`;

// Documented defaults for every control (xAxisPosition is 'top' by default, but with points
// the chart always draws it at the bottom).
const DEFAULTS: State = {
  chartWidth: 500,
  chartHeight: 500,
  titleFontSize: 20,
  quadrantLabelFontSize: 16,
  pointRadius: 5,
  pointLabelFontSize: 12,
  quadrantInternalBorderStrokeWidth: 1,
  quadrantExternalBorderStrokeWidth: 2,
  xAxisPosition: 'top',
  yAxisPosition: 'left',
  palette: 'theme default',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, palette: 'warm', pointRadius: 9, chartWidth: 440, chartHeight: 440 },
  { ...DEFAULTS, palette: 'cool', yAxisPosition: 'right', quadrantInternalBorderStrokeWidth: 4 },
  { ...DEFAULTS, palette: 'traffic light', pointRadius: 12, pointLabelFontSize: 16 },
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
