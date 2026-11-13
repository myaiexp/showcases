// sdfRectangle reading its aspect ratio from a node attribute, morphing between square and stretched
import Graph from 'graphology';
import Sigma from 'sigma';
import { sdfRectangle } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

// Widths over heights, from tall to wide; the long side always spans the node's full size.
const RATIOS = [0.4, 0.6, 1, 1.5, 2.2, 3, 0.5, 0.8, 1.2, 1.8, 2.6, 0.7];
const COLORS = ['#277da1', '#e22653', '#2a9d8f', '#f4a261'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  RATIOS.forEach((ratio, i) => {
    graph.addNode(`r${i}`, {
      x: (i % 4) * 10,
      y: -Math.floor(i / 4) * 10,
      size: 3.4,
      color: COLORS[i % COLORS.length],
      imageRatio: ratio,
      label: ratio.toFixed(2),
    });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // Read the ratio from a custom attribute (falling back to 1) instead of the default "aspectRatio".
        shapes: [sdfRectangle({ aspectRatio: { attribute: 'imageRatio', default: 1 }, cornerRadius: 0.1 })],
      },
    },
    styles: {
      nodes: {
        color: { attribute: 'color' },
        size: { attribute: 'size' },
        shape: 'rectangle',
        label: { attribute: 'label' },
        labelVisibility: 'visible',
        labelPosition: 'below',
      },
    },
  });

  // stretch = 0 gives squares, 1 the base ratios, above 1 exaggerates them.
  const apply = (stretch: number): void => {
    RATIOS.forEach((ratio, i) => {
      const value = ratio ** stretch;
      graph.mergeNodeAttributes(`r${i}`, { imageRatio: value, label: value.toFixed(2) });
    });
  };

  let frame = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      apply(0.5 + 0.5 * Math.sin((now - start) / 900));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1.4';
    slider.step = '0.05';
    slider.value = '1';
    slider.addEventListener('input', () => apply(Number(slider.value)));
    apply(1);
    controls.append('Stretch ', slider);
    el.append(controls);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
