// ELK layout options as live controls on a graph with parallel edges, next to dagre with the classic look
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const CONTROLS: Control[] = [
  { key: 'layout', label: 'layout', kind: 'select', options: ['elk', 'dagre'] },
  { key: 'mergeEdges', label: 'mergeEdges', kind: 'check' },
  { key: 'nodePlacementStrategy', label: 'nodePlacementStrategy', kind: 'select', options: ['BRANDES_KOEPF', 'SIMPLE', 'NETWORK_SIMPLEX', 'LINEAR_SEGMENTS'] },
  { key: 'nodePlacementAlignment', label: 'nodePlacementAlignment', kind: 'select', options: ['(from preset)', 'NONE', 'LEFTUP', 'LEFTDOWN', 'RIGHTUP', 'RIGHTDOWN', 'BALANCED'] },
  { key: 'preset', label: 'preset', kind: 'select', options: ['default', 'legacy', 'modelOrder', 'depthFirst'] },
];

// Two edges between Start and Check are parallel, which is what mergeEdges combines.
const FLOW = `flowchart LR
  A[Start] --> B{Choose Path}
  A --> B
  B -->|Option 1| C[Path 1]
  B -->|Option 2| D[Path 2]
  B -->|Option 3| E[Path 3]
  C --> F[Finish]
  D --> F
  E --> F
  D --> E`;

// With dagre the elk block is left out: ELK options only apply to the ELK engine. look: classic and
// theme: default are the pairing the syntax reference shows for Dagre.
const definition = (s: State): string => {
  if (s.layout === 'dagre') {
    return `---
config:
  layout: dagre
  look: classic
  theme: default
---
${FLOW}`;
  }
  const align = s.nodePlacementAlignment === '(from preset)' ? '' : `\n    nodePlacementAlignment: ${s.nodePlacementAlignment}`;
  return `---
config:
  layout: elk
  elk:
    mergeEdges: ${s.mergeEdges}
    nodePlacementStrategy: ${s.nodePlacementStrategy}${align}
    preset: ${s.preset}
---
${FLOW}`;
};

const DEFAULTS: State = {
  layout: 'elk',
  mergeEdges: false,
  nodePlacementStrategy: 'BRANDES_KOEPF',
  nodePlacementAlignment: '(from preset)',
  preset: 'default',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, mergeEdges: true, nodePlacementStrategy: 'LINEAR_SEGMENTS', nodePlacementAlignment: 'NONE' },
  { ...DEFAULTS, nodePlacementStrategy: 'NETWORK_SIMPLEX', preset: 'depthFirst' },
  { ...DEFAULTS, layout: 'dagre' },
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
    }, 2800);
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
