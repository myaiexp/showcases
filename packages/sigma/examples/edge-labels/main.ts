// Edge labels: labelPosition modes and the fixed or scaled fontSizeMode primitive
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildRing } from './data.ts';
import { addButton, addSelect, controlRow } from './ui.ts';
import './style.css';

const POSITIONS = ['over', 'above', 'below', 'auto', '0.25'] as const;
const MODES = ['fixed', 'scaled'] as const;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildRing();

  // Primitives are compiled once, so changing the font size mode builds a fresh renderer.
  const start = (mode: (typeof MODES)[number]): Sigma => {
    const renderer = new Sigma(graph, container, {
      settings: { renderEdgeLabels: true },
      primitives: { edges: { label: { fontSizeMode: mode } } },
      styles: {
        nodes: [DEFAULT_STYLES.nodes, { label: { attribute: 'label' } }],
        edges: [
          DEFAULT_STYLES.edges,
          {
            label: { attribute: 'label' },
            labelVisibility: 'visible',
            labelPosition: { attribute: 'pos', defaultValue: 'over' },
            labelSize: 13,
          },
        ],
      },
    });
    return renderer;
  };

  let renderer = start('fixed');
  const setPosition = (value: string): void => {
    // A numeric string is a ratio along the edge (0 = source, 1 = target).
    const pos = value === '0.25' ? 0.25 : value;
    graph.updateEachEdgeAttributes((_edge, attrs) => ({ ...attrs, pos }));
  };
  const setMode = (mode: string): void => {
    renderer.kill();
    renderer = start(mode === 'scaled' ? 'scaled' : 'fixed');
  };
  const zoom = (): void => {
    const camera = renderer.getCamera();
    void camera.animate({ ratio: camera.ratio > 0.7 ? 0.4 : 1 }, { duration: 900 });
  };

  let timer = 0;
  if (preview) {
    // Cards take no input: step through the positions while the camera zooms in and out.
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      setPosition(POSITIONS[i % POSITIONS.length] ?? 'over');
      zoom();
    }, 1600);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelPosition', POSITIONS, 'over', setPosition);
    addSelect(row, 'fontSizeMode', MODES, 'fixed', setMode);
    addButton(row, 'Zoom in / out', zoom);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
