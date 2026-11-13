// Sankey config as live controls (label style, node size, alignment, link colour) plus CSV quirk datasets
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const CONTROLS: Control[] = [
  { key: 'csv', label: 'CSV', kind: 'select', options: ['plain', 'empty lines', 'commas', 'double quotes'] },
  { key: 'labelStyle', label: 'labelStyle', kind: 'select', options: ['legacy', 'outlined'] },
  { key: 'linkColor', label: 'linkColor', kind: 'select', options: ['source', 'target', 'gradient', '#a1a1a1'] },
  { key: 'nodeAlignment', label: 'nodeAlignment', kind: 'select', options: ['justify', 'center', 'left', 'right'] },
  { key: 'nodeWidth', label: 'nodeWidth', kind: 'range', min: 4, max: 40 },
  { key: 'nodePadding', label: 'nodePadding', kind: 'range', min: 4, max: 50 },
  { key: 'showValues', label: 'showValues', kind: 'check' },
  { key: 'width', label: 'width', kind: 'range', min: 400, max: 900, step: 25 },
  { key: 'height', label: 'height', kind: 'range', min: 250, max: 600, step: 25 },
];

// The same flows in four spellings of the CSV. Every row is source,target,value.
const DATA: Record<string, string> = {
  plain: `Electricity grid,Heating and cooling - homes,113.726
Electricity grid,Industry,342.165
Electricity grid,Losses,56.691
Industry,Exports,120.5
Industry,Domestic goods,221.665`,
  // Empty lines without commas are allowed for visual grouping.
  'empty lines': `Bio-conversion,Losses,26.862

Bio-conversion,Solid,280.322

Bio-conversion,Gas,81.144

Gas,Heat,40
Gas,Power,41.144`,
  // A comma inside a name needs the name wrapped in double quotes.
  commas: `Pumped heat,"Heating and cooling, homes",193.026
Pumped heat,"Heating and cooling, commercial",70.672
"Heating and cooling, homes",Insulation losses,23.1`,
  // A double quote inside a quoted name is written as two.
  'double quotes': `Pumped heat,"Heating and cooling, ""homes""",193.026
Pumped heat,"Heating and cooling, ""commercial""",70.672
"Heating and cooling, ""homes""",Insulation losses,23.1`,
};

const definition = (s: State): string => `---
config:
  sankey:
${CONTROLS.filter((c) => c.key !== 'csv')
  .map((c) => `    ${c.key}: ${c.key === 'linkColor' ? `"${s[c.key]}"` : s[c.key]}`)
  .join('\n')}
---
sankey

${DATA[String(s.csv)]}`;

const DEFAULTS: State = {
  csv: 'plain',
  labelStyle: 'legacy',
  linkColor: 'source',
  nodeAlignment: 'justify',
  nodeWidth: 10,
  nodePadding: 12,
  showValues: true,
  width: 600,
  height: 400,
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, labelStyle: 'outlined', linkColor: 'gradient', nodeWidth: 18 },
  { ...DEFAULTS, csv: 'empty lines', nodeAlignment: 'left', linkColor: 'target', nodePadding: 30 },
  { ...DEFAULTS, csv: 'commas', labelStyle: 'outlined', nodeAlignment: 'right', showValues: false },
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
