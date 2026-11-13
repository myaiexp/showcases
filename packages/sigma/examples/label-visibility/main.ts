// Label culling: labelDensity, labelRenderedSizeThreshold and per-node labelVisibility
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusters } from './data.ts';
import { addRange, addSelect, controlRow } from './ui.ts';
import './style.css';

const RULES = ['all auto', 'hubs always visible', 'group 0 hidden'] as const;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildClusters();

  const renderer = new Sigma(graph, container, {
    settings: { labelDensity: 1, labelRenderedSizeThreshold: 6 },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        {
          label: { attribute: 'label' },
          labelVisibility: { attribute: 'vis', defaultValue: 'auto' },
        },
        // Hovering always forces the label, as in the docs.
        { whenState: 'isHovered', then: { labelVisibility: 'visible' } },
      ],
    },
  });

  const applyRule = (rule: string): void => {
    graph.updateEachNodeAttributes((node, attrs) => {
      let vis = 'auto';
      if (rule === 'hubs always visible' && graph.degree(node) >= 6) vis = 'visible';
      if (rule === 'group 0 hidden' && attrs['group'] === 0) vis = 'hidden';
      return { ...attrs, vis };
    });
  };

  let timer = 0;
  if (preview) {
    // Sweep labelDensity up and down so the label count visibly breathes.
    let t = 0;
    timer = window.setInterval(() => {
      t += 0.35;
      renderer.setSetting('labelDensity', 0.15 + 1.6 * (0.5 + 0.5 * Math.sin(t)));
    }, 250);
  } else {
    const row = controlRow(el);
    addRange(row, 'labelDensity', [0.1, 4, 0.1], 1, (v) => renderer.setSetting('labelDensity', v));
    addRange(row, 'labelRenderedSizeThreshold', [0, 20, 1], 6, (v) =>
      renderer.setSetting('labelRenderedSizeThreshold', v),
    );
    addSelect(row, 'labelVisibility', RULES, RULES[0], applyRule);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
