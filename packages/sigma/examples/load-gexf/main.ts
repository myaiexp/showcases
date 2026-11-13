// Parse an inline GEXF string with graphology-gexf and render the resulting graph
import Graph from 'graphology';
import { parse } from 'graphology-gexf/browser';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGexf } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // The docs fetch() a .gexf file; here the same text comes from data.ts, so no network.
  const gexf = buildGexf(preview ? 8 : 14);

  // parse() reads viz:position, viz:size, viz:color and the label into x, y, size,
  // color and label, which are exactly the attributes sigma's default styles read.
  const graph = parse(Graph, gexf);
  const renderer = new Sigma(graph, container, { settings: { renderEdgeLabels: false } });

  let timer = 0;
  
  if (preview) {
    // Slowly turn the camera so the card is not a still image.
    const camera = renderer.getCamera();
    let turn = 0;
    const spin = (): void => {
      turn += Math.PI / 2;
      void camera.animate({ angle: turn }, { duration: 1800 });
    };
    spin();
    timer = window.setInterval(spin, 2000);
  } else {
    const row = controlsRow(el);
    const source = document.createElement('pre');
    source.className = 'source';
    source.hidden = true;
    source.textContent = gexf;
    const readout = document.createElement('span');
    readout.textContent = `Parsed ${graph.order} nodes and ${graph.size} edges (${graph.type} graph)`;
    row.append(
      readout,
      button('Toggle GEXF source', () => {
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
