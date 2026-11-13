// Packet diagram config as live controls: row size, bit width, bits per row, padding, bit numbers and order
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { buildControls, makeDrawer, type State, type Control } from '../../shared/controls.ts';

const CONTROLS: Control[] = [
  { key: 'bitsPerRow', label: 'bitsPerRow', kind: 'select', options: ['16', '24', '32'] },
  { key: 'bitWidth', label: 'bitWidth', kind: 'range', min: 14, max: 40 },
  { key: 'rowHeight', label: 'rowHeight', kind: 'range', min: 20, max: 60 },
  { key: 'paddingX', label: 'paddingX', kind: 'range', min: 0, max: 20 },
  { key: 'paddingY', label: 'paddingY', kind: 'range', min: 0, max: 40 },
  { key: 'showBits', label: 'showBits', kind: 'check' },
  { key: 'bitOrder', label: 'bitOrder', kind: 'select', options: ['ascending', 'descending'] },
];

const definition = (s: State): string => {
  return `---
config:
  packet:
${CONTROLS.map((c) => `    ${c.key}: ${s[c.key]}`).join('\n')}
---
packet
title UDP Packet
+16: "Source Port"
+16: "Destination Port"
32-47: "Length"
48-63: "Checksum"
64-95: "Data (variable length)"`;
};

const DEFAULTS: State = {
  bitsPerRow: '32',
  bitWidth: 32,
  rowHeight: 32,
  paddingX: 5,
  paddingY: 5,
  showBits: true,
  bitOrder: 'ascending',
};

const PRESETS: State[] = [
  DEFAULTS,
  { ...DEFAULTS, bitsPerRow: '16', bitWidth: 28, rowHeight: 40 },
  { ...DEFAULTS, bitOrder: 'descending', paddingX: 12, paddingY: 24 },
  { ...DEFAULTS, bitsPerRow: '24', showBits: false },
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
