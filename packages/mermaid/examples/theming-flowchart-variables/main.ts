// Live colour inputs for the theme and flowchart variables from theming.md, applied to the base theme
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// Part one: the general Theme Variables table. Part two: the Flowchart Variables table.
const GENERAL = ['primaryColor', 'primaryTextColor', 'primaryBorderColor', 'secondaryColor', 'tertiaryColor', 'lineColor', 'textColor', 'background', 'mainBkg'];
const FLOWCHART = ['nodeBorder', 'clusterBkg', 'clusterBorder', 'defaultLinkColor', 'titleColor', 'edgeLabelBackground', 'nodeTextColor'];

const CONTROLS: Control[] = [
  { key: 'darkMode', label: 'darkMode', kind: 'check' },
  { key: 'fontSize', label: 'fontSize (px)', kind: 'range', min: 12, max: 24 },
  ...[...GENERAL, ...FLOWCHART].map((key): Control => ({ key, label: key, kind: 'color' })),
];

// Only variables whose box is ticked are written, so the rest stay derived from primaryColor
// the way "Color and Color Calculation" describes. theme: base is the one modifiable theme.
const definition = (s: State): string => {
  const lines = [...GENERAL, ...FLOWCHART].filter((k) => s[`${k}?`]).map((k) => `    ${k}: "${s[k]}"`);
  return `---
config:
  theme: base
  themeVariables:
    darkMode: ${s.darkMode}
    fontSize: "${s.fontSize}px"
${lines.join('\n')}
---
graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  B --> G[/Another/]
  C ==>|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[Car]
  subgraph section
    C
    D
    E
    F
    G
  end`;
};

const COLOURS: Record<string, string> = {
  primaryColor: '#bb2528',
  primaryTextColor: '#ffffff',
  primaryBorderColor: '#7c0000',
  secondaryColor: '#006100',
  tertiaryColor: '#1e293b',
  lineColor: '#f8b229',
  textColor: '#e5e7eb',
  background: '#0f172a',
  mainBkg: '#bb2528',
  nodeBorder: '#7c0000',
  clusterBkg: '#1e293b',
  clusterBorder: '#64748b',
  defaultLinkColor: '#f8b229',
  titleColor: '#f8fafc',
  edgeLabelBackground: '#334155',
  nodeTextColor: '#ffffff',
};

const DEFAULTS: State = { darkMode: true, fontSize: 16, ...COLOURS };
// Start with the docs' Christmas palette partly set: primary, text, border, secondary, tertiary, line.
for (const k of ['primaryColor', 'primaryTextColor', 'primaryBorderColor', 'secondaryColor', 'tertiaryColor', 'lineColor']) DEFAULTS[`${k}?`] = true;

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, primaryColor: '#0e7490', primaryBorderColor: '#164e63', lineColor: '#67e8f9', secondaryColor: '#7c3aed' },
  { ...DEFAULTS, 'clusterBkg?': true, clusterBkg: '#3f1d38', 'clusterBorder?': true, clusterBorder: '#f472b6', 'nodeTextColor?': true, nodeTextColor: '#fde68a' },
  { ...DEFAULTS, fontSize: 20, primaryColor: '#15803d', primaryBorderColor: '#bbf7d0', 'defaultLinkColor?': true, defaultLinkColor: '#fde047' },
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
