// Architecture layout tuning as live controls (randomize, spacing, elasticity, seed) and inline-pack icons
import type { Mount } from '@/types.ts';
import type { IconLoader } from 'mermaid';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { mermaid } from '../../shared/setup.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

// A tiny Iconify JSON pack passed directly (nothing is fetched). Registered once, because
// registration is page-wide; diagrams then write archpack:name in the parentheses.
const PACK: IconLoader = {
  name: 'archpack',
  icons: {
    prefix: 'archpack',
    width: 24,
    height: 24,
    icons: {
      app: { body: '<rect x="3" y="4" width="18" height="14" rx="2" fill="#38bdf8"/><path fill="#0c4a6e" d="M9 20h6v2H9z"/>' },
      db: { body: '<ellipse cx="12" cy="6" rx="8" ry="3" fill="#a78bfa"/><path fill="#7c3aed" d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0 1.7-3.6 3-8 3S4 7.7 4 6z"/>' },
      queue: { body: '<path fill="#fbbf24" d="M3 4h18v4H3zM3 10h18v4H3zM3 16h18v4H3z"/>' },
      user: { body: '<circle cx="12" cy="7" r="4" fill="#4ade80"/><path fill="#16a34a" d="M4 21c0-5 3.5-8 8-8s8 3 8 8z"/>' },
    },
  },
};
let registered = false;
const ensurePack = (): void => {
  if (registered) return;
  registered = true;
  mermaid.registerIconPacks([PACK]);
};

const CONTROLS: Control[] = [
  { key: 'randomize', label: 'randomize', kind: 'check' },
  { key: 'seed', label: 'seed', kind: 'range', min: 0, max: 20 },
  { key: 'nodeSeparation', label: 'nodeSeparation', kind: 'range', min: 20, max: 200, step: 5 },
  { key: 'idealEdgeLengthMultiplier', label: 'idealEdgeLengthMultiplier', kind: 'range', min: 0.5, max: 4, step: 0.25 },
  { key: 'edgeElasticity', label: 'edgeElasticity', kind: 'range', min: 0.05, max: 1, step: 0.05 },
  { key: 'numIter', label: 'numIter', kind: 'range', min: 100, max: 5000, step: 100 },
  { key: 'icons', label: 'icons', kind: 'select', options: ['built-in', 'inline pack'] },
];

const definition = (s: State): string => {
  const [user, app, queue, db] =
    s.icons === 'inline pack'
      ? ['archpack:user', 'archpack:app', 'archpack:queue', 'archpack:db']
      : ['internet', 'server', 'disk', 'database'];
  return `---
config:
  architecture:
${CONTROLS.filter((c) => c.key !== 'icons')
  .map((c) => `    ${c.key}: ${s[c.key]}`)
  .join('\n')}
---
architecture-beta
    group api(cloud)[Platform]

    service user(${user})[Customer]
    service web(${app})[Web app] in api
    service jobs(${queue})[Job queue] in api
    service store(${db})[Database] in api
    service cache(${queue})[Cache] in api

    user:R --> L:web
    web:R --> L:jobs
    web:B --> T:store
    jobs:B --> T:cache
    store:R -- L:cache`;
};

// Documented defaults, with randomize off and the deterministic seed 1.
const DEFAULTS: State = {
  randomize: false,
  seed: 1,
  nodeSeparation: 75,
  idealEdgeLengthMultiplier: 1.5,
  edgeElasticity: 0.45,
  numIter: 2500,
  icons: 'built-in',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, idealEdgeLengthMultiplier: 3, nodeSeparation: 120, icons: 'inline pack' },
  { ...DEFAULTS, seed: 7, randomize: true },
  { ...DEFAULTS, idealEdgeLengthMultiplier: 0.75, edgeElasticity: 0.9, icons: 'inline pack' },
];

const mount: Mount = (el, { preview, signal }) => {
  ensurePack();
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
