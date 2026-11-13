// Dashed edges with per-edge dash and gap sizes, round or butt caps, and animated dash offset
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerDashed } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { makePicker } from './ui.ts';
import './style.css';

// Dash and gap lengths in pixels, one pair per edge.
const PATTERNS = [
  { dash: 16, gap: 8 },
  { dash: 8, gap: 8 },
  { dash: 4, gap: 10 },
  { dash: 28, gap: 5 },
  { dash: 1, gap: 9 },
];
const CAPS = ['butt', 'round'] as const;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  PATTERNS.forEach(({ dash, gap }, i) => {
    const y = i * 12;
    graph.addNode(`a${i}`, { x: 0, y, size: 1.5, color: '#277da1' });
    graph.addNode(`b${i}`, { x: 100, y, size: 1.5, color: '#e22653' });
    graph.addEdge(`a${i}`, `b${i}`, { size: 1.2, color: '#333', dash, gap, offset: 0 });
  });

  let renderer: Sigma | null = null;
  const build = (cap: (typeof CAPS)[number]): void => {
    // `cap` is a layer option, compiled into the shader: switching it needs a new renderer.
    renderer?.kill();
    renderer = new Sigma(graph, container, {
      settings: { autoRescaleContent: 'nodes' },
      primitives: {
        edges: {
          // Layers read per-edge values through declared variables (concepts/styles-and-primitives § Variables).
          variables: {
            dash: { type: 'number', default: 8 },
            gap: { type: 'number', default: 8 },
            offset: { type: 'number', default: 0 },
          },
          layers: [
            layerDashed({
              cap,
              dashSize: { attribute: 'dash', mode: 'pixels' },
              gapSize: { attribute: 'gap', mode: 'pixels' },
              dashOffset: { attribute: 'offset', mode: 'pixels' },
            }),
          ],
        },
      },
      styles: { edges: { color: { attribute: 'color' }, size: { attribute: 'size' } } },
    });
  };

  let cap = 0;
  const picker = makePicker([...CAPS].map((c) => `cap: '${c}'`), (i) => {
    cap = i;
    picker.select(i);
    build(CAPS[i] ?? 'butt');
  });
  picker.select(cap);
  build('butt');

  // Marching ants: the dash offset is an edge attribute, so animating it is just attribute writes.
  let frame = 0;
  const tick = (now: number): void => {
    graph.forEachEdge((edge) => graph.setEdgeAttribute(edge, 'offset', -now / 40));
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => build(CAPS[(cap = (cap + 1) % CAPS.length)] ?? 'butt'), 2500);
  } else {
    el.append(picker.root);
  }

  return () => {
    cancelAnimationFrame(frame);
    clearInterval(timer);
    renderer?.kill();
  };
};

export default mount;
