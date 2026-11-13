// Edge label legibility: the textBorder primitive and label backgrounds on edges
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildWeb } from './data.ts';
import { addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

const BACKGROUNDS: Record<string, string> = {
  none: 'transparent',
  'white 85%': 'rgba(255, 255, 255, 0.85)',
  yellow: '#ffe066',
};

interface Look {
  border: number;
  background: string;
}

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildWeb();

  // textBorder lives in the edge label primitives, so a change rebuilds the renderer.
  const start = ({ border, background }: Look): Sigma =>
    new Sigma(graph, container, {
      settings: { renderEdgeLabels: true },
      primitives: {
        edges: {
          label: border > 0 ? { textBorder: { width: border, color: '#ffffff' } } : {},
        },
      },
      styles: {
        nodes: [DEFAULT_STYLES.nodes, { label: { attribute: 'label' } }],
        edges: [
          DEFAULT_STYLES.edges,
          {
            label: { attribute: 'label' },
            labelVisibility: 'visible',
            labelPosition: 'over',
            labelSize: 16,
            labelColor: '#111',
            labelBackgroundColor: background,
            labelBackgroundPadding: 3,
          },
        ],
      },
    });

  const look: Look = { border: 2, background: 'transparent' };
  let renderer = start(look);
  const change = (patch: Partial<Look>): void => {
    Object.assign(look, patch);
    renderer.kill();
    renderer = start(look);
  };

  let timer = 0;
  if (preview) {
    // Cycle plain, bordered, background, both.
    const steps: Look[] = [
      { border: 0, background: 'transparent' },
      { border: 2, background: 'transparent' },
      { border: 0, background: '#ffe066' },
      { border: 2, background: 'rgba(255, 255, 255, 0.85)' },
    ];
    let i = 0;
    timer = window.setInterval(() => change(steps[++i % steps.length] ?? look), 2200);
  } else {
    const row = controlRow(el);
    addRange(row, 'textBorder width', [0, 6, 1], look.border, (border) => change({ border }));
    addSelect(row, 'labelBackgroundColor', Object.keys(BACKGROUNDS), 'none', (name) =>
      change({ background: BACKGROUNDS[name] ?? 'transparent' }),
    );
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
