// Pin selected nodes on top: a custom isSelected state mapped to the topNodes depth bucket
import Sigma from 'sigma';
import { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildPile } from './data.ts';
import { addButton, controlRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildPile();

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    // isSelected is not a built-in flag: declare it as custom node state.
    customNodeState: { isSelected: false },
    primitives: { depthLayers: ['edges', 'nodes', 'topEdges', 'topNodes'] },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { label: { attribute: 'label' }, labelPosition: 'over', labelVisibility: 'visible', labelSize: 12 },
        // The recipe: selected nodes jump to the top bucket. Colour them too so the selection reads.
        { whenState: 'isSelected', then: { depth: 'topNodes', color: '#e22653' } },
      ],
    },
  });

  const toggle = (node: string): void => {
    renderer.setNodeState(node, { isSelected: !renderer.getNodeState(node).isSelected });
  };
  const clear = (): void => {
    graph.forEachNode((node) => renderer.setNodeState(node, { isSelected: false }));
  };

  let timer = 0;
  if (preview) {
    // Select a different node every beat; the previous one drops back into the pile.
    const nodes = graph.nodes();
    let i = 0;
    timer = window.setInterval(() => {
      clear();
      const picks = [nodes[(i * 7) % nodes.length], nodes[(i * 7 + 11) % nodes.length]];
      for (const pick of picks) if (pick) toggle(pick);
      i++;
    }, 1200);
  } else {
    renderer.on('clickNode', ({ node }) => toggle(node));
    const row = controlRow(el);
    addButton(row, 'Clear selection', clear);
    const hint = document.createElement('span');
    hint.textContent = 'Click nodes to select them: they move to the top bucket and turn red.';
    row.append(hint);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
