// Live colour inputs for the Sequence Diagram Variables from theming.md on the base theme
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// The Sequence Diagram Variables table, plus the three note variables from the general table.
const COLOR_KEYS = ['actorBkg',  'actorBorder',  'actorTextColor',  'actorLineColor',  'signalColor',  'signalTextColor',  'labelBoxBkgColor',  'labelBoxBorderColor',  'labelTextColor',  'loopTextColor',  'activationBorderColor',  'activationBkgColor',  'sequenceNumberColor',  'noteBkgColor',  'noteTextColor',  'noteBorderColor'];

const CONTROLS: Control[] = [
  { key: 'fontSize', label: 'fontSize (px)', kind: 'range', min: 12, max: 22 },
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
    fontSize: "${s.fontSize}px"
${colours.join('\n')}
---
sequenceDiagram
  autonumber
  participant Alice
  participant Bob
  Alice->>Bob: Hello Bob, can you review this?
  activate Bob
  loop Every day
    Bob-->>Alice: Looking at it
  end
  Note right of Bob: Thinks it over
  alt Approved
    Bob->>Alice: Looks good
  else Needs work
    Bob->>Alice: Please change it
  end
  deactivate Bob`;
};

const COLOURS: Record<string, string> = {
  actorBkg: '#1e3a8a',
  actorBorder: '#93c5fd',
  actorTextColor: '#ffffff',
  actorLineColor: '#64748b',
  signalColor: '#e2e8f0',
  signalTextColor: '#e2e8f0',
  labelBoxBkgColor: '#1e40af',
  labelBoxBorderColor: '#93c5fd',
  labelTextColor: '#ffffff',
  loopTextColor: '#fde68a',
  activationBorderColor: '#fbbf24',
  activationBkgColor: '#78350f',
  sequenceNumberColor: '#ffffff',
  noteBkgColor: '#fef3c7',
  noteTextColor: '#1f2937',
  noteBorderColor: '#f59e0b',
};

const DEFAULTS: State = { fontSize: 15, ...COLOURS };
for (const k of ['actorBkg', 'actorBorder', 'actorTextColor', 'signalColor', 'signalTextColor', 'activationBkgColor']) DEFAULTS[`${k}?`] = true;

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, actorBkg: '#065f46', actorBorder: '#6ee7b7', activationBkgColor: '#134e4a' },
  { ...DEFAULTS, 'loopTextColor?': true, loopTextColor: '#f9a8d4', 'labelBoxBkgColor?': true, labelBoxBkgColor: '#831843', 'labelBoxBorderColor?': true, labelBoxBorderColor: '#f472b6' },
  { ...DEFAULTS, fontSize: 19, 'noteBkgColor?': true, 'noteTextColor?': true, 'noteBorderColor?': true, 'sequenceNumberColor?': true, sequenceNumberColor: '#fde047' },
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
