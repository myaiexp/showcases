// Arrows, bars, circles, diamonds and squares at the tail and head of edges
import Graph from 'graphology';
import Sigma, { DEFAULT_STYLES } from 'sigma';
import {
  extremityArrow,
  extremityBar,
  extremityCircle,
  extremityDiamond,
  extremitySquare,
  pathCurved,
  pathLine,
} from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

// Names come from the factories; "none" skips the extremity.
const TYPES = ['arrow', 'bar', 'circle', 'diamond', 'square', 'none'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const ROWS = 4;
  const graph = new Graph();
  for (let i = 0; i < ROWS; i++) {
    graph.addNode(`a${i}`, { x: 0, y: i * 28, size: 3, color: '#277da1', side: 'left' });
    graph.addNode(`b${i}`, { x: 100, y: i * 28, size: 3, color: '#e22653', side: 'right' });
    // Alternate straight and curved edges so extremities follow the path direction.
    graph.addEdge(`a${i}`, `b${i}`, {
      // Extremity sizes are multiples of the edge thickness (arrow: 5 long, 4 wide), so a thick edge
      // on a ~100-unit layout is what makes the shapes readable.
      size: 3,
      color: '#555',
      path: i % 2 === 0 ? 'straight' : 'curved',
      curvature: 0.25,
    });
  }

  // `tail` is the source end, `head` the target end. Both are plain edge attributes read by styles.
  let shift = 0;
  const assign = (): void => {
    for (let i = 0; i < ROWS; i++) {
      const edge = graph.edges(`a${i}`, `b${i}`)[0];
      if (!edge) continue;
      const tail = TYPES[(i + shift) % TYPES.length] ?? 'none';
      const head = TYPES[(i + shift + 1) % TYPES.length] ?? 'none';
      graph.mergeEdgeAttributes(edge, { tail, head });
      if (!preview) {
        graph.setNodeAttribute(`a${i}`, 'label', `tail: ${tail}`);
        graph.setNodeAttribute(`b${i}`, 'label', `head: ${head}`);
      }
    }
  };
  assign();

  const renderer = new Sigma(graph, container, {
    // Labels sit outside the nodes (see below), so the full view needs side padding for them.
    settings: { autoRescaleContent: 'nodes', stagePadding: preview ? 28 : 110 },
    primitives: {
      edges: {
        paths: [pathLine(), pathCurved({ curvature: { attribute: 'curvature' } })],
        extremities: [extremityArrow(), extremityBar(), extremityCircle(), extremityDiamond(), extremitySquare()],
      },
    },
    styles: {
      // Labels go to the outer side of each node so they never lie on an edge.
      nodes: [
        DEFAULT_STYLES.nodes,
        { labelVisibility: 'visible' },
        { labelPosition: { attribute: 'side' } },
      ],
      edges: [
        DEFAULT_STYLES.edges,
        { path: { attribute: 'path' }, head: { attribute: 'head' }, tail: { attribute: 'tail' } },
      ],
    },
  });

  const shuffle = (): void => {
    shift++;
    assign();
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(shuffle, 1500);
  } else {
    const row = document.createElement('div');
    row.className = 'controls';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Shift extremities';
    button.addEventListener('click', shuffle);
    row.append(button);
    el.append(row);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
