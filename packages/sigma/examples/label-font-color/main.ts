// Node label typography: labelColor, labelSize and labelFont style properties
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildRing } from './data.ts';
import { addColor, addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

const FONTS = ['Arial, sans-serif', 'Georgia, serif', 'monospace', 'Courier New, monospace', 'Impact, sans-serif'];
const PRESETS = [
  { labelColor: '#333333', labelSize: 14, labelFont: 'Georgia, serif' },
  { labelColor: '#e22653', labelSize: 20, labelFont: 'monospace' },
  { labelColor: '#277da1', labelSize: 12, labelFont: 'Arial, sans-serif' },
  { labelColor: '#111111', labelSize: 24, labelFont: 'Impact, sans-serif' },
];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildRing();
  const apply = (patch: Record<string, string | number>): void => {
    graph.updateEachNodeAttributes((_node, attrs) => ({ ...attrs, ...patch }));
  };

  const renderer = new Sigma(graph, container, {
    // Nodes render under the 6px label threshold in a 200px card, which would hide every label.
    settings: { labelRenderedSizeThreshold: preview ? 0 : 6 },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          // The docs set these as literals; reading attributes lets the controls change them live.
          labelColor: { attribute: 'labelColor', defaultValue: '#333' },
          labelSize: { attribute: 'labelSize', defaultValue: 14 },
          labelFont: { attribute: 'labelFont', defaultValue: 'Georgia, serif' },
        },
      ],
    },
  });
  apply(PRESETS[0] ?? {});

  let timer = 0;
  if (preview) {
    let i = 1;
    timer = window.setInterval(() => apply(PRESETS[i++ % PRESETS.length] ?? {}), 1300);
  } else {
    const row = controlRow(el);
    addSelect(row, 'labelFont', FONTS, 'Georgia, serif', (labelFont) => apply({ labelFont }));
    addRange(row, 'labelSize', [8, 32, 1], 14, (labelSize) => apply({ labelSize }));
    addColor(row, 'labelColor', '#333333', (labelColor) => apply({ labelColor }));
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
