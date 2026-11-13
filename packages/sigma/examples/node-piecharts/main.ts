// layerPiechart from @sigma/node-piechart: slice values from node attributes, a rotating offset, an empty default
import { layerPiechart } from '@sigma/node-piechart';
import Graph from 'graphology';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import './style.css';

const COLS = 4;
const ROWS = 2;
const NEUTRAL = '#7798fa';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  for (let i = 0; i < COLS * ROWS; i++) {
    graph.addNode(`p${i}`, {
      x: (i % COLS) * 10,
      y: -Math.floor(i / COLS) * 10,
      size: 3.2,
      negative: 0,
      neutral: 0,
      positive: 0,
      offset: 0,
    });
  }
  graph.setNodeAttribute(`p${COLS * ROWS - 1}`, 'label', 'all zero');

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // The layer reads declared variables, which the styles below bind to node attributes.
        variables: {
          negative: { type: 'number', default: 0 },
          neutral: { type: 'number', default: 0 },
          positive: { type: 'number', default: 0 },
          offset: { type: 'number', default: 0 },
        },
        layers: [
          layerPiechart({
            // Slice proportions are computed from the values, so only the ratios matter.
            slices: [
              { color: '#f05454', value: { attribute: 'negative' } },
              { color: NEUTRAL, value: { attribute: 'neutral' } },
              { color: '#6ddb55', value: { attribute: 'positive' } },
            ],
            // Shown when every slice is zero.
            defaultColor: '#bcb7c4',
            // Radians; read from an attribute so it can change per node and over time.
            offset: { attribute: 'offset' },
          }),
        ],
      },
    },
    styles: {
      nodes: {
        size: { attribute: 'size' },
        negative: { attribute: 'negative', defaultValue: 0 },
        neutral: { attribute: 'neutral', defaultValue: 0 },
        positive: { attribute: 'positive', defaultValue: 0 },
        offset: { attribute: 'offset', defaultValue: 0 },
        label: { attribute: 'label' },
        labelVisibility: 'visible',
        labelPosition: 'below',
      },
    },
  });

  // The last node stays at zero on purpose, so the default colour is on show.
  const update = (t: number, offset: number): void => {
    for (let i = 0; i < COLS * ROWS - 1; i++) {
      graph.mergeNodeAttributes(`p${i}`, {
        negative: 5 + 4 * Math.sin(t + i),
        neutral: 5 + 4 * Math.sin(t * 0.7 + i * 2),
        positive: 5 + 4 * Math.sin(t * 1.3 + i * 3),
        offset,
      });
    }
  };

  let frame = 0;
  const start = performance.now();
  if (preview) {
    const tick = (now: number): void => {
      const t = (now - start) / 1000;
      update(t, t * 0.6);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = String(Math.PI * 2);
    slider.step = '0.05';
    slider.value = '0';
    controls.append('Offset (radians) ', slider);
    el.append(controls);
    const tick = (now: number): void => {
      update((now - start) / 1000, Number(slider.value));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
