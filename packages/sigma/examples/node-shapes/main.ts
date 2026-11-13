// The five built-in SDF shapes: one labelled row of each, and one row that cycles through them
import Graph from 'graphology';
import Sigma from 'sigma';
import { sdfCircle, sdfDiamond, sdfRectangle, sdfSquare, sdfTriangle } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

const SHAPES = ['circle', 'square', 'triangle', 'diamond', 'rectangle'] as const;
const COLORS = ['#277da1', '#e22653', '#2a9d8f', '#f4a261', '#8e5ea2'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  SHAPES.forEach((shape, i) => {
    // Top row: one node per shape, fixed.
    graph.addNode(`fixed-${shape}`, { x: i * 10, y: 6, size: 2.4, shape, color: COLORS[i], label: shape, aspectRatio: 1.6 });
    // Bottom row: every node takes the same shape, which changes over time.
    graph.addNode(`cycle-${i}`, { x: i * 10, y: -6, size: 2.4, shape: 'circle', color: COLORS[i], label: 'circle', aspectRatio: 1.6 });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      // Shapes must be declared before nodes can pick them; the first one is the default.
      nodes: { shapes: [sdfCircle(), sdfSquare(), sdfTriangle(), sdfDiamond(), sdfRectangle()] },
    },
    styles: {
      nodes: {
        color: { attribute: 'color' },
        size: { attribute: 'size' },
        shape: { attribute: 'shape', defaultValue: 'circle' },
        label: { attribute: 'label' },
        labelVisibility: 'visible',
        labelPosition: 'below',
      },
    },
  });

  const setCycleShape = (shape: string): void => {
    for (let i = 0; i < SHAPES.length; i++) graph.mergeNodeAttributes(`cycle-${i}`, { shape, label: shape });
  };

  let step = 0;
  let timer = 0;
  const startCycle = (): void => {
    timer = window.setInterval(() => setCycleShape(SHAPES[++step % SHAPES.length] ?? 'circle'), preview ? 1200 : 1600);
  };
  startCycle();

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const select = document.createElement('select');
    for (const value of ['cycle', ...SHAPES]) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value === 'cycle' ? 'cycle through shapes' : `all ${value}`;
      select.append(option);
    }
    select.addEventListener('change', () => {
      clearInterval(timer);
      if (select.value === 'cycle') startCycle();
      else setCycleShape(select.value);
    });
    controls.append('Bottom row: ', select);
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
