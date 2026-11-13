// Fitting the viewport: autoRescaleContent (positions, nodes, labels) and stagePadding
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildExtremes } from './data.ts';
import { addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

const MODES = ['positions', 'nodes', 'labels'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, { preview }) => {
  // The frame carries the size and the readout; sigma gets its own child to fill.
  const frame = document.createElement('div');
  frame.className = 'frame';
  const container = document.createElement('div');
  container.className = 'stage';
  const readout = document.createElement('div');
  readout.className = 'mode';
  frame.append(container, readout);
  el.append(frame);

  const graph = buildExtremes();
  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'positions', stagePadding: 30 },
    styles: {
      nodes: [DEFAULT_STYLES.nodes, { label: { attribute: 'label' }, labelVisibility: 'visible' }],
    },
  });

  const setMode = (mode: Mode): void => {
    renderer.setSetting('autoRescaleContent', mode);
    readout.textContent = `autoRescaleContent: "${mode}"`;
  };
  setMode('positions');

  let timer = 0;
  if (preview) {
    // Cycle the three fits: each one zooms out a little further to enclose more.
    let i = 0;
    timer = window.setInterval(() => setMode(MODES[++i % MODES.length] ?? 'positions'), 1800);
  } else {
    const row = controlRow(el);
    addSelect(row, 'autoRescaleContent', MODES, 'positions', (v) => setMode(v as Mode));
    addRange(row, 'stagePadding', [0, 100, 5], 30, (v) => renderer.setSetting('stagePadding', v));
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
