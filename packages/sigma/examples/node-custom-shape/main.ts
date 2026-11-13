// A hand-written heart SDFShape used next to the built-in circle, flipping nodes between the two
import Graph from 'graphology';
import Sigma from 'sigma';
import { sdfCircle } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { sdfHeart } from './heart.ts';
import './style.css';

const COUNT = 12;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  for (let i = 0; i < COUNT; i++) {
    const angle = (i / COUNT) * Math.PI * 2;
    graph.addNode(`n${i}`, {
      x: 12 * Math.cos(angle),
      y: 12 * Math.sin(angle),
      size: 3.2,
      color: i % 2 ? '#e22653' : '#ff7a9c',
      shape: i % 2 ? 'heart' : 'circle',
    });
  }
  graph.addNode('center', { x: 0, y: 0, size: 6, color: '#e22653', shape: 'heart' });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      // The custom shape is declared exactly like the built-in ones.
      nodes: { shapes: [sdfCircle(), sdfHeart()] },
    },
    styles: {
      nodes: { color: { attribute: 'color' }, size: { attribute: 'size' }, shape: { attribute: 'shape', defaultValue: 'circle' } },
    },
  });

  // Swap every ring node's shape, and make the centre heart beat.
  let flipped = false;
  const flip = (): void => {
    flipped = !flipped;
    for (let i = 0; i < COUNT; i++) {
      const heart = (i % 2 === 1) !== flipped;
      graph.mergeNodeAttributes(`n${i}`, { shape: heart ? 'heart' : 'circle', color: heart ? '#e22653' : '#ff7a9c' });
    }
  };
  const timer = window.setInterval(flip, preview ? 1100 : 1600);

  let frame = 0;
  const start = performance.now();
  const beat = (now: number): void => {
    const t = ((now - start) / 800) % 1;
    graph.setNodeAttribute('center', 'size', 6 + 1.2 * Math.max(0, Math.sin(t * Math.PI * 2)) ** 2);
    frame = requestAnimationFrame(beat);
  };
  frame = requestAnimationFrame(beat);

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append('Shapes are declared as [sdfCircle(), sdfHeart()]; each node picks one by name.');
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
