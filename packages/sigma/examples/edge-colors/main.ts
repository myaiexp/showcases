// Switches between the ways an edge colour can be supplied: style, attribute, or an endpoint's colour
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerPlain } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { ringEdges, ringNodes } from './data.ts';
import { makePicker } from './ui.ts';
import './style.css';

const MODES = ['Style: { attribute }', 'Layer: { attribute }', "Layer: { node: 'source' }", "Layer: { node: 'target' }"];

// Mode 0 leaves layerPlain alone so it uses the edge's own colour style; the others override it.
function layerFor(mode: number) {
  switch (mode) {
    case 1:
      return layerPlain({ color: { attribute: 'tint' } });
    case 2:
      return layerPlain({ color: { node: 'source' } });
    case 3:
      return layerPlain({ color: { node: 'target' } });
    default:
      return layerPlain();
  }
}

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  for (const { key, x, y, color } of ringNodes) graph.addNode(key, { x, y, color, size: 2.5 });
  for (const { source, target, color, tint } of ringEdges) {
    graph.addEdge(source, target, { color, tint, size: 0.5 });
  }

  let renderer: Sigma | null = null;
  const build = (mode: number): void => {
    // Layers are compiled into the edge program, so changing the colour source means a new renderer.
    renderer?.kill();
    renderer = new Sigma(graph, container, {
      settings: { autoRescaleContent: 'nodes' },
      primitives: {
        edges: {
          // Layers read per-edge values through declared variables (styles-and-primitives § Variables).
          variables: { tint: { type: 'color', default: '#999999' } },
          layers: [layerFor(mode)],
        },
      },
      styles: { edges: { color: { attribute: 'color' } } },
    });
  };

  const picker = makePicker(MODES, (i) => {
    picker.select(i);
    build(i);
  });
  let mode = 0;
  picker.select(mode);
  build(mode);

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => build((mode = (mode + 1) % MODES.length)), 1800);
  } else {
    el.append(picker.root);
  }

  return () => {
    clearInterval(timer);
    renderer?.kill();
  };
};

export default mount;
