// Select nodes, then drag the whole selection at once with positions snapped to a sub-grid
import Sigma, { DEFAULT_STYLES } from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGrid } from './data.ts';
import './style.css';

const SNAP_SIZE = 0.5;
const snap = (v: number): number => Math.round(v / SNAP_SIZE) * SNAP_SIZE;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGrid(preview ? 6 : 8);

  const renderer = new Sigma(graph, container, {
    settings: {
      autoRescale: 'once',
      enableNodeDrag: true,
      // Dragging a selected node moves every selected node; any other node moves alone.
      getDraggedNodes: (node: string): string[] => {
        if (renderer.getNodeState(node).isSelected) {
          return graph.filterNodes((n: string) => renderer.getNodeState(n).isSelected);
        }
        return [node];
      },
      // Positions are rounded before they reach the graph.
      dragPositionToAttributes: (position) => ({ x: snap(position.x), y: snap(position.y) }),
    },
    customNodeState: { isSelected: false },
    customGraphState: { selectionSize: 0 },
    styles: {
      nodes: [
        DEFAULT_STYLES.nodes,
        { color: { attribute: 'color' }, size: { attribute: 'size' } },
        { when: (_a, state, graphState) => graphState.selectionSize > 0 && !state.isSelected, then: { color: '#d9dce1' } },
        { whenState: 'isSelected', then: { color: '#e4572e', depth: 'topNodes', labelVisibility: 'visible' } },
      ],
      edges: [
        DEFAULT_STYLES.edges,
        { color: '#c9ced6', size: { attribute: 'size' } },
        { when: (_a, _s, graphState) => graphState.selectionSize > 0, then: { color: '#eceef1' } },
      ],
    },
  });

  const setSelected = (nodes: string[]): void => {
    const chosen = new Set(nodes);
    graph.forEachNode((n) => renderer.setNodeState(n, { isSelected: chosen.has(n) }));
    renderer.setGraphState({ selectionSize: chosen.size });
  };
  const selected = (): string[] => graph.filterNodes((n) => renderer.getNodeState(n).isSelected);

  let frame = 0;
  if (!preview) {
    // A click is also reported after a drag; ignore that one or the selection would collapse.
    let moved = false;
    renderer.on('nodeDragStart', () => (moved = false));
    renderer.on('nodeDrag', () => (moved = true));
    renderer.on('clickNode', ({ node, event }) => {
      if (moved) return void (moved = false);
      if (!event.original.shiftKey) return setSelected([node]);
      const now = new Set(selected());
      if (!now.delete(node)) now.add(node);
      setSelected([...now]);
    });
    renderer.on('clickStage', () => setSelected([]));

    const controls = document.createElement('div');
    controls.className = 'controls';
    const readout = document.createElement('span');
    readout.className = 'readout';
    const sync = (): void => void (readout.textContent = `${renderer.getGraphState().selectionSize} selected`);
    renderer.on('afterRender', sync);
    controls.append(
      'Click selects, shift+click adds, click the background clears. Drag a selected node to move them all. ',
      readout,
    );
    el.append(controls);
  } else {
    // No pointer: select a block, then slide it around in half-unit steps like a drag would.
    const block = ['1,1', '2,1', '1,2', '2,2'];
    setSelected(block);
    const start = performance.now();
    const tick = (now: number): void => {
      const t = (now - start) / 900;
      const dx = snap(Math.sin(t) * 1.6);
      const dy = snap(Math.cos(t * 0.8) * 1.2);
      for (const n of block) {
        const [c, r] = n.split(',').map(Number);
        graph.mergeNodeAttributes(n, { x: snap(Number(c) + dx), y: snap(Number(r) + dy) });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
