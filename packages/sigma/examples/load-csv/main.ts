// Parse nodes and edges CSV text with papaparse, then build the graph by hand
import Graph from 'graphology';
import Papa from 'papaparse';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildCsv } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

type Row = Record<string, string>;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // Stands in for the docs' fetch("./nodes.csv") / fetch("./edges.csv").
  const { nodesCSV, edgesCSV } = buildCsv(preview ? 3 : 4, preview ? 6 : 8);

  // header: true turns each line into an object keyed by the header row.
  // Every cell is a string, so numbers go through parseFloat.
  const nodes = Papa.parse<Row>(nodesCSV, { header: true, skipEmptyLines: true }).data;
  const edges = Papa.parse<Row>(edgesCSV, { header: true, skipEmptyLines: true }).data;

  const graph = new Graph();
  for (const node of nodes) {
    graph.addNode(node['id'] ?? '', {
      label: node['label'],
      x: parseFloat(node['x'] ?? ''),
      y: parseFloat(node['y'] ?? ''),
      // Empty cells fall back to a default, as in the docs. Sizes here are in layout units.
      size: parseFloat(node['size'] ?? '') || 2,
      color: node['color'] || '#666',
    });
  }
  for (const edge of edges) {
    graph.addEdge(edge['source'] ?? '', edge['target'] ?? '', {
      size: (parseFloat(edge['weight'] ?? '') || 1) * 0.3,
    });
  }

  const renderer = new Sigma(graph, container);

  let timer = 0;
  if (preview) {
    // Breathe the camera in and out so the card is alive.
    const camera = renderer.getCamera();
    let zoomed = false;
    const breathe = (): void => {
      zoomed = !zoomed;
      void camera.animate({ ratio: zoomed ? 0.55 : 1 }, { duration: 1600 });
    };
    breathe();
    timer = window.setInterval(breathe, 1800);
  } else {
    const row = controlsRow(el);
    const source = document.createElement('div');
    source.className = 'source';
    source.hidden = true;
    for (const [name, text] of [
      ['nodes.csv', nodesCSV],
      ['edges.csv', edgesCSV],
    ] as const) {
      const block = document.createElement('pre');
      block.textContent = `${name}\n${text}`;
      source.append(block);
    }
    const info = document.createElement('span');
    info.textContent = `${graph.order} nodes and ${graph.size} edges from ${nodes.length} + ${edges.length} CSV rows`;
    row.append(
      info,
      button('Toggle CSV source', () => {
        source.hidden = !source.hidden;
      }),
    );
    el.append(source);
  }

  return () => {
    window.clearInterval(timer);
    renderer.getCamera().cancelAnimation();
    renderer.kill();
  };
};

export default mount;
