// Stage styles: the container's cursor and background react to graph state flags
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { controlsRow, readout } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 10 : 18);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      nodes: {
        x: { attribute: 'x' },
        y: { attribute: 'y' },
        color: { whenState: 'isHovered', then: '#e22653', else: '#277da1' },
        size: 2.6,
        // Nodes set their own cursor; the stage cursor is the fallback when nothing is hovered.
        cursor: 'pointer',
      },
      edges: { color: '#ccc', size: 0.3 },
      // Stage rules take graph state only (no attributes). Later rules override earlier ones.
      stage: [
        { background: '#ffffff', cursor: 'grab' },
        { whenState: 'isDragging', then: { background: '#e8f1fb', cursor: 'grabbing' } },
        { whenState: 'hasHovered', then: { background: '#fdf3e6' } },
      ],
    },
  });

  let timer = 0;
  const row = preview ? null : controlsRow(el);
  const status = row ? readout(row) : null;
  const describe = (): void => {
    if (!status) return;
    const gs = renderer.getGraphState();
    status.textContent = `isDragging: ${gs.isDragging}, hasHovered: ${gs.hasHovered}. Drag the stage, then hover a node.`;
  };
  if (status) {
    renderer.on('afterRender', describe);
    describe();
  } else {
    // No pointer in a card: toggle the same flags and let the stage rules answer.
    let step = 0;
    timer = window.setInterval(() => {
      step = (step + 1) % 3;
      renderer.setGraphState({ isDragging: step === 1, hasHovered: step === 2 });
    }, 1000);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
