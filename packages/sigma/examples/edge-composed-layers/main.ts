// Stacks plain, gradient and dashed edge layers, which can be toggled to see how they composite
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerDashed, layerGradient, layerPlain } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { hueToHex } from './hue.ts';
import './style.css';

const LAYERS = ['layerPlain', 'layerGradient', 'layerDashed'] as const;
// Subsets cycled through in gallery cards.
const SEQUENCE: boolean[][] = [
  [true, false, false],
  [true, true, false],
  [true, true, true],
  [false, true, true],
  [false, false, true],
];

function buildLayers(on: boolean[]) {
  // Declaration order is paint order: earlier layers sit behind later ones.
  const layers = [];
  if (on[0]) layers.push(layerPlain({ color: '#aab' }));
  if (on[1]) layers.push(layerGradient({ stops: [{ node: 'source' }, { node: 'target' }] }));
  if (on[2]) layers.push(layerDashed({ dashSize: { value: 8 }, gapSize: { value: 8 }, dashColor: '#fff' }));
  return layers;
}

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const N = 10;
  const graph = new Graph();
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2;
    graph.addNode(`n${i}`, {
      x: Math.cos(angle) * 40,
      y: Math.sin(angle) * 40,
      size: 3,
      color: hueToHex((i / N) * 360),
    });
  }
  for (let i = 0; i < N; i++) {
    graph.addEdge(`n${i}`, `n${(i + 1) % N}`, { size: 2.2 });
    graph.addEdge(`n${i}`, `n${(i + 4) % N}`, { size: 2.2 });
  }

  let renderer: Sigma | null = null;
  const build = (on: boolean[]): void => {
    renderer?.kill();
    const layers = buildLayers(on);
    renderer = new Sigma(graph, container, {
      settings: { autoRescaleContent: 'nodes' },
      primitives: { edges: { layers: layers.length > 0 ? layers : [layerPlain()] } },
    });
  };

  const state = [true, true, true];
  build(state);

  let timer = 0;
  if (preview) {
    let step = 2;
    timer = window.setInterval(() => build(SEQUENCE[(step = (step + 1) % SEQUENCE.length)] ?? state), 1800);
  } else {
    const row = document.createElement('div');
    row.className = 'controls';
    LAYERS.forEach((name, i) => {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = true;
      box.addEventListener('change', () => {
        state[i] = box.checked;
        build(state);
      });
      label.append(box, ` ${name}()`);
      row.append(label);
    });
    el.append(row);
  }

  return () => {
    clearInterval(timer);
    renderer?.kill();
  };
};

export default mount;
