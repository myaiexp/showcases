// Compares nodeLabelEvents modes: label hits routed to the node ("extend") or to their own events ("separate")
import Sigma from 'sigma';
import type { Settings } from 'sigma/settings';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

type LabelEvents = Settings['nodeLabelEvents'];

const MODES: { name: string; value: LabelEvents }[] = [
  { name: 'false', value: false },
  { name: '"extend"', value: 'extend' },
  { name: '"separate"', value: 'separate' },
  // Per-interaction form: clicks reach the node, hovers become label events.
  { name: '{ click: "extend", enter/leave: "separate" }', value: { click: 'extend', enter: 'separate', leave: 'separate', default: false } },
];

const mount: Mount = (el, { preview }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const container = document.createElement('div');
  container.className = 'stage';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  frame.append(container, overlay);
  el.append(frame);

  const graph = buildClusterGraph(3, 6);
  const renderer = new Sigma(graph, container, {
    settings: { labelRenderedSizeThreshold: 0, nodeLabelEvents: 'extend' },
    styles: {
      nodes: [
        {
          x: { attribute: 'x' },
          y: { attribute: 'y' },
          size: { attribute: 'size' },
          color: { attribute: 'color' },
          label: { attribute: 'label' },
          labelSize: 14,
        },
        // Hover on the node, or on its label when the mode is "extend".
        { whenState: 'isHovered', then: { color: '#e22653', labelVisibility: 'visible' } },
        // Only turns on when the mode is "separate": the label is its own target.
        { whenState: 'isLabelHovered', then: { labelColor: '#e22653', labelSize: 20, labelVisibility: 'visible' } },
      ],
    },
  });

  let timer = 0;
  if (preview) {
    const nodes = graph.nodes();
    const modes: ('extend' | 'separate')[] = ['extend', 'separate'];
    let i = 0;
    // The pointer is off in a card, so set the flag each mode would set: "extend" lights the
    // node (hover on its label counts as hover on the node), "separate" lights only the label.
    const step = (): void => {
      renderer.setNodesState(nodes, { isHovered: false, isLabelHovered: false });
      const mode = modes[i % 2] ?? 'extend';
      renderer.setSetting('nodeLabelEvents', mode);
      renderer.setNodeState(nodes[(i * 5) % nodes.length] ?? '', mode === 'extend' ? { isHovered: true } : { isLabelHovered: true });
      overlay.textContent = `nodeLabelEvents: '${mode}'`;
      i++;
    };
    step();
    timer = window.setInterval(step, 1500);
    return () => {
      clearInterval(timer);
      renderer.kill();
    };
  }

  // Full view: count the events each mode produces.
  const counts: Record<string, number> = {};
  const names = [
    'enterNode',
    'enterNodeLabel',
    'leaveNode',
    'leaveNodeLabel',
    'clickNode',
    'clickNodeLabel',
  ] as const;
  const readout = document.createElement('code');
  readout.className = 'readout';
  const show = (last: string): void => {
    readout.textContent = `${names.map((n) => `${n}: ${counts[n] ?? 0}`).join('\n')}\n\nlast: ${last}`;
  };
  show('none yet');
  for (const name of names) {
    renderer.on(name, ({ node }) => {
      counts[name] = (counts[name] ?? 0) + 1;
      show(`${name} on ${node}`);
    });
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const select = document.createElement('select');
  MODES.forEach((m, i) => select.append(new Option(`nodeLabelEvents: ${m.name}`, String(i), false, m.value === 'extend')));
  const apply = (): void => {
    const mode = MODES[Number(select.value)];
    if (!mode) return;
    renderer.setSetting('nodeLabelEvents', mode.value);
    overlay.textContent = `nodeLabelEvents: ${mode.name}`;
  };
  select.addEventListener('change', apply);
  const reset = document.createElement('button');
  reset.textContent = 'Reset counts';
  reset.addEventListener('click', () => {
    for (const n of names) counts[n] = 0;
    show('none yet');
  });
  controls.append(select, reset);
  overlay.textContent = 'nodeLabelEvents: "extend"';
  el.append(controls, readout);

  return () => renderer.kill();
};

export default mount;
