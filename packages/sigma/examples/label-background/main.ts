// Node label backgrounds: labelBackgroundColor and labelBackgroundPadding
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

interface Look {
  labelBackgroundColor: string;
  labelBackgroundPadding: number;
  labelColor: string;
}

const LOOKS: Record<string, Look> = {
  none: { labelBackgroundColor: 'transparent', labelBackgroundPadding: 0, labelColor: '#111' },
  'white 80%': { labelBackgroundColor: 'rgba(255, 255, 255, 0.8)', labelBackgroundPadding: 4, labelColor: '#111' },
  yellow: { labelBackgroundColor: '#ffe066', labelBackgroundPadding: 6, labelColor: '#111' },
  dark: { labelBackgroundColor: '#222', labelBackgroundPadding: 8, labelColor: '#fff' },
};

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph();
  const apply = (patch: Partial<Look>): void => {
    graph.updateEachNodeAttributes((_node, attrs) => ({ ...attrs, ...patch }));
  };

  const renderer = new Sigma(graph, container, {
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          // "over" centres the label on the node so the edges cross it.
          labelPosition: 'over',
          labelVisibility: 'visible',
          labelColor: { attribute: 'labelColor', defaultValue: '#111' },
          labelBackgroundColor: { attribute: 'labelBackgroundColor', defaultValue: 'transparent' },
          labelBackgroundPadding: { attribute: 'labelBackgroundPadding', defaultValue: 0 },
        },
      ],
    },
  });
  apply(LOOKS['white 80%'] ?? {});

  let timer = 0;
  if (preview) {
    const names = Object.keys(LOOKS);
    let i = 0;
    timer = window.setInterval(() => apply(LOOKS[names[i++ % names.length] ?? 'none'] ?? {}), 1300);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelBackgroundColor', Object.keys(LOOKS), 'white 80%', (name) => apply(LOOKS[name] ?? {}));
    addRange(row, 'labelBackgroundPadding', [0, 16, 1], 4, (labelBackgroundPadding) => apply({ labelBackgroundPadding }));
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
