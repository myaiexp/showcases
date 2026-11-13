// Node labels: labelPosition (right, left, above, below, over) and labelAngle
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGrid, POSITIONS } from './data.ts';
import { addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

const MIXED = 'mixed (one each)';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGrid();
  const initial = new Map(graph.mapNodes((node, attrs) => [node, String(attrs['pos'])] as const));

  const renderer = new Sigma(graph, container, {
    // Nodes render under the 6px label threshold in a 200px card, which would hide every label.
    settings: { labelRenderedSizeThreshold: preview ? 0 : 6 },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          // Bound to attributes only so the controls below can change them at runtime.
          labelPosition: { attribute: 'pos', defaultValue: 'right' },
          labelAngle: { attribute: 'angle', defaultValue: 0 },
        },
      ],
    },
  });

  const setPosition = (value: string): void => {
    graph.updateEachNodeAttributes((node, attrs) => ({
      ...attrs,
      pos: value === MIXED ? initial.get(node) : value,
    }));
  };

  let timer = 0;
  if (preview) {
    // Cards take no input: step through every position on a timer.
    let i = 0;
    timer = window.setInterval(() => {
      setPosition(POSITIONS[i++ % POSITIONS.length] ?? 'right');
    }, 1200);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelPosition', [MIXED, ...POSITIONS], MIXED, setPosition);
    addRange(row, 'labelAngle (deg)', [0, 360, 5], 0, (deg) => {
      graph.updateEachNodeAttributes((_node, attrs) => ({ ...attrs, angle: (deg * Math.PI) / 180 }));
    });
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
