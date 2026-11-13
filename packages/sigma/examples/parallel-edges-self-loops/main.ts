// Parallel edges fanned out by parallelPath/parallelSpread, and self-loops drawn by selfLoopPath
import Graph from 'graphology';
import Sigma, { DEFAULT_STYLES } from 'sigma';
import { pathCurved, pathLine, pathLoop } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

const COLORS = ['#e63946', '#f9a03f', '#2a9d8f', '#277da1', '#6c3e81'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // A multi graph is required: plain graphs refuse two edges between the same pair.
  const graph = new Graph({ multi: true });
  const nodes = [
    { key: 'a', x: 0, y: 0 },
    { key: 'b', x: 60, y: 0 },
    { key: 'c', x: 30, y: 52 },
  ];
  for (const { key, x, y } of nodes) graph.addNode(key, { label: key.toUpperCase(), x, y, size: 3, color: '#444' });

  const link = (source: string, target: string, count: number): void => {
    for (let i = 0; i < count; i++) {
      graph.addEdge(source, target, { size: 0.6, color: COLORS[i % COLORS.length] ?? '#999', spread: 0.25 });
    }
  };
  link('a', 'b', 4);
  link('b', 'c', 3);
  link('c', 'a', 2);
  // Self-loops: source equals target.
  link('a', 'a', 1);
  link('b', 'b', 2);
  link('c', 'c', 1);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes', stagePadding: 60 },
    primitives: {
      edges: {
        // pathLoop must be declared again once `paths` is overridden.
        paths: [pathLine(), pathCurved(), pathLoop()],
      },
    },
    styles: {
      nodes: [DEFAULT_STYLES.nodes, { labelVisibility: 'visible' }],
      edges: [
        DEFAULT_STYLES.edges,
        {
          parallelPath: 'curved',
          parallelSpread: { attribute: 'spread' },
          selfLoopPath: 'loop',
        },
      ],
    },
  });

  const setSpread = (spread: number): void => {
    graph.forEachEdge((edge) => graph.setEdgeAttribute(edge, 'spread', spread));
  };

  let frame = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      setSpread(0.25 + 0.2 * Math.sin((now - start) / 700));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const row = document.createElement('div');
    row.className = 'controls';
    const label = document.createElement('label');
    const readout = document.createElement('span');
    readout.textContent = '0.25';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '0.6';
    slider.step = '0.01';
    slider.value = '0.25';
    slider.addEventListener('input', () => {
      setSpread(Number(slider.value));
      readout.textContent = Number(slider.value).toFixed(2);
    });
    label.append('parallelSpread ', slider, ' ', readout);
    row.append(label);
    el.append(row);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
