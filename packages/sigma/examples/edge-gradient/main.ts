// Gradient edges: stop lists that blend, fade, cut and switch between endpoint colours
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerGradient, layerPlain } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { makePicker } from './ui.ts';
import './style.css';

const VARIANTS = [
  'source to target',
  'fade through transparent',
  'stub from source',
  'hard switch',
  'enabled per edge',
];

function layersFor(variant: number) {
  switch (variant) {
    case 1:
      return [layerGradient({ stops: [{ node: 'source' }, 'transparent', { node: 'target' }] })];
    case 2:
      return [layerGradient({ stops: [{ node: 'source' }, { color: 'transparent', offset: 0.1 }] })];
    case 3:
      return [
        layerGradient({
          stops: [
            { node: 'source', offset: 0.5 },
            { node: 'target', offset: 0.5 },
          ],
        }),
      ];
    case 4:
      // Edges whose `fancy` attribute is false let the grey plain layer below show through.
      return [
        layerPlain({ color: '#bbb' }),
        layerGradient({ stops: [{ node: 'source' }, { node: 'target' }], enabled: { attribute: 'fancy' } }),
      ];
    default:
      return [layerGradient({ stops: [{ node: 'source' }, { node: 'target' }] })];
  }
}

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // Two columns of nodes, each source wired to two targets so the edges cross.
  const SOURCE_COLORS = ['#e22653', '#f9a03f', '#e9c46a', '#43aa8b', '#6c3e81'];
  const TARGET_COLORS = ['#277da1', '#2a9d8f', '#264653', '#4361ee', '#7209b7'];
  const graph = new Graph();
  for (let i = 0; i < 5; i++) {
    graph.addNode(`s${i}`, { x: 0, y: i * 20, size: 3, color: SOURCE_COLORS[i] ?? '#999' });
    graph.addNode(`t${i}`, { x: 100, y: i * 20, size: 3, color: TARGET_COLORS[i] ?? '#999' });
  }
  for (let i = 0; i < 5; i++) {
    graph.addEdge(`s${i}`, `t${i}`, { size: 1.6, fancy: true });
    graph.addEdge(`s${i}`, `t${(i + 2) % 5}`, { size: 1.6, fancy: i % 2 === 0 });
  }

  let renderer: Sigma | null = null;
  const build = (variant: number): void => {
    renderer?.kill();
    renderer = new Sigma(graph, container, {
      settings: { autoRescaleContent: 'nodes' },
      primitives: {
        edges: {
          // Layers read per-edge values through declared variables (styles-and-primitives § Variables).
          variables: { fancy: { type: 'boolean', default: true } },
          layers: layersFor(variant),
        },
      },
    });
  };

  let variant = 0;
  const picker = makePicker(VARIANTS, (i) => {
    variant = i;
    picker.select(i);
    build(i);
  });
  picker.select(variant);
  build(variant);

  let timer = 0;
  if (preview) {
    timer = window.setInterval(() => build((variant = (variant + 1) % VARIANTS.length)), 1800);
  } else {
    el.append(picker.root);
  }

  return () => {
    clearInterval(timer);
    renderer?.kill();
  };
};

export default mount;
