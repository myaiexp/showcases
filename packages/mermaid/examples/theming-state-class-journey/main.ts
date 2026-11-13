// Live colour inputs for the State, Class and User Journey colour variables from theming.md on the base theme
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// One set of controls for three diagrams: labelColor and altBackground colour states, classText colours
// class diagrams, and fillType0..7 are the journey section fills. Pick the diagram to see them act.
const COLOR_KEYS = ['labelColor', 'altBackground', 'classText', 'primaryColor', 'secondaryColor', 'lineColor', 'fillType0', 'fillType1', 'fillType2', 'fillType3', 'fillType4', 'fillType5', 'fillType6', 'fillType7'];

const DIAGRAMS: Record<string, string> = {
  // Deep composite states use altBackground; state labels use labelColor.
  state: `stateDiagram-v2
  [*] --> Active
  state Active {
    [*] --> Idle
    Idle --> Busy
    state Busy {
      [*] --> Reading
      Reading --> Writing
    }
  }
  Active --> [*]`,
  // Class text (names, members) uses classText.
  class: `classDiagram
  class Animal {
    +String name
    +eat()
  }
  class Dog {
    +bark()
  }
  Animal <|-- Dog`,
  // Each section takes the next fillType; eight sections show all eight fills.
  journey: `journey
  title A working day
  section Morning
    Wake up: 3: Me
  section Commute
    Train: 2: Me
  section Office
    Meetings: 1: Me, Team
  section Lunch
    Eat: 5: Me
  section Afternoon
    Code: 4: Me
  section Review
    Read PRs: 3: Me
  section Evening
    Cook: 4: Me
  section Night
    Sleep: 5: Me`,
};

const CONTROLS: Control[] = [
  { key: 'diagram', label: 'diagram', kind: 'select', options: Object.keys(DIAGRAMS) },
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
${colours.join('\n')}
---
${DIAGRAMS[String(s.diagram)]}`;
};

const COLOURS: Record<string, string> = {
  labelColor: '#fde68a',
  altBackground: '#334155',
  classText: '#fde68a',
  primaryColor: '#1e3a8a',
  secondaryColor: '#065f46',
  lineColor: '#cbd5e1',
  fillType0: '#1e3a8a',
  fillType1: '#065f46',
  fillType2: '#7c2d12',
  fillType3: '#581c87',
  fillType4: '#164e63',
  fillType5: '#831843',
  fillType6: '#713f12',
  fillType7: '#14532d',
};

const DEFAULTS: State = { diagram: 'state', ...COLOURS };
for (const k of ['primaryColor', 'secondaryColor', 'lineColor']) DEFAULTS[`${k}?`] = true;

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, diagram: 'state', 'labelColor?': true, 'altBackground?': true },
  { ...DEFAULTS, diagram: 'class', 'classText?': true, classText: '#bbf7d0', primaryColor: '#14532d' },
  { ...DEFAULTS, diagram: 'journey', 'fillType0?': true, 'fillType1?': true, 'fillType2?': true, 'fillType3?': true, 'fillType4?': true, 'fillType5?': true, 'fillType6?': true, 'fillType7?': true },
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
