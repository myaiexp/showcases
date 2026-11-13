// Styles keyed on node state flags (isHovered, isHighlighted, isDragged, isHidden, isLabelHovered)
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

// One colour per flag, so each state is recognisable on sight.
const FLAG_COLORS = {
  isHovered: '#e22653',
  isHighlighted: '#f9a03f',
  isDragged: '#277da1',
} as const;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildClusterGraph(4, 10);
  const renderer = new Sigma(graph, container, {
    // Custom state sits next to the built-in flags and is read the same way in styles.
    customNodeState: { isSelected: false },
    // "separate" is what makes isLabelHovered turn on, instead of isHovered.
    settings: { nodeLabelEvents: 'separate', labelRenderedSizeThreshold: 3, enableNodeDrag: true },
    styles: {
      nodes: [
        {
          x: { attribute: 'x' },
          y: { attribute: 'y' },
          size: { attribute: 'size' },
          color: { attribute: 'color' },
          label: { attribute: 'label' },
        },
        { whenState: 'isSelected', then: { size: 2.6 } },
        // Rules run in order, so later flags win when several are on at once.
        { whenState: 'isHovered', then: { color: FLAG_COLORS.isHovered, size: 2.6, labelVisibility: 'visible' } },
        { whenState: 'isLabelHovered', then: { labelColor: FLAG_COLORS.isHovered, labelSize: 18, labelVisibility: 'visible' } },
        { whenState: 'isHighlighted', then: { color: FLAG_COLORS.isHighlighted, size: 2.6, labelVisibility: 'visible' } },
        { whenState: 'isDragged', then: { color: FLAG_COLORS.isDragged, size: 3.2 } },
        { whenState: 'isHidden', then: { visibility: 'hidden' } },
      ],
    },
  });

  const flags = ['isHovered', 'isLabelHovered', 'isHighlighted', 'isDragged', 'isHidden'] as const;
  type Flag = (typeof flags)[number];

  let timer = 0;
  if (preview) {
    // Walk flags and nodes with setNodeState: no pointer needed.
    const nodes = graph.nodes();
    const cycle: Flag[] = ['isHovered', 'isHighlighted', 'isDragged', 'isHidden'];
    let i = 0;
    const step = (): void => {
      renderer.setNodesState(nodes, { isHovered: false, isHighlighted: false, isDragged: false, isHidden: false });
      const flag = cycle[i % cycle.length] ?? 'isHovered';
      // Hit a few nodes of one cluster at a time.
      const base = (i * 7) % nodes.length;
      renderer.setNodesState(
        [0, 1, 2, 3].map((k) => nodes[(base + k) % nodes.length] ?? ''),
        { [flag]: true },
      );
      i++;
    };
    step();
    timer = window.setInterval(step, 900);
    return () => {
      clearInterval(timer);
      renderer.kill();
    };
  }

  // Full view: click a node to select it, tick the flags sigma lets you set, and watch the real
  // pointer-driven ones (hover, drag) turn on in the readout.
  let selected = graph.nodes()[0] ?? '';
  const controls = document.createElement('div');
  controls.className = 'controls';
  const readout = document.createElement('code');
  readout.className = 'readout';

  for (const flag of ['isHighlighted', 'isHidden'] as const) {
    const label = document.createElement('label');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.addEventListener('change', () => renderer.setNodeState(selected, { [flag]: box.checked }));
    label.append(box, ` setNodeState(selected, { ${flag} })`);
    controls.append(label);
  }
  const select = (node: string): void => {
    renderer.setNodeState(selected, { isSelected: false });
    selected = node;
    renderer.setNodeState(selected, { isSelected: true });
  };
  select(selected);
  renderer.on('clickNode', ({ node }) => select(node));

  // State changes have no dedicated event, so poll a few times a second.
  const poll = window.setInterval(() => {
    const state = renderer.getNodeState(selected);
    const graphState = renderer.getGraphState();
    const on = (names: readonly string[], source: object): string =>
      names.map((n) => `${n}: ${String((source as Record<string, unknown>)[n])}`).join('  ');
    readout.textContent =
      `node ${selected}\n${on(flags, state)}\n\ngraph\n` +
      on(['isIdle', 'isPanning', 'isZooming', 'isDragging', 'hasHovered', 'hasHighlighted'], graphState);
  }, 150);
  const hint = document.createElement('p');
  hint.textContent = 'Click a node to select it (larger). Hover or drag any node, or hover a label, to see those flags on the graph.';
  hint.style.color = 'var(--fg-3)';
  el.append(controls, hint, readout);

  return () => {
    clearInterval(poll);
    renderer.kill();
  };
};

export default mount;
