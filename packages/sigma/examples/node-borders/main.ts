// layerBorder from @sigma/node-border: relative, stacked and fixed-pixel borders driven by node attributes
import { layerBorder } from '@sigma/node-border';
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerFill } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import './style.css';

const COLS = 4;
const FILLS = ['#277da1', '#2a9d8f', '#f4a261', '#8e5ea2'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // Row 0: one relative border. Row 1: two stacked relative borders. Row 2: a relative border with a fixed-width pixel one inside.
  const graph = new Graph();
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < COLS; col++) {
      graph.addNode(`${row}-${col}`, {
        x: col * 10,
        y: -row * 10,
        size: 3.5,
        color: FILLS[col],
        borderColor: '#e22653',
        ringColor: '#222222',
        pixelColor: '#222222',
        borderSize: 0,
        ringSize: 0,
        pixelSize: 0,
      });
    }
  }

  // Border sizes are a fraction of the node radius, except the pixel one.
  const apply = (amount: number, phase: (col: number) => number): void => {
    for (let col = 0; col < COLS; col++) {
      const k = phase(col) * amount;
      graph.mergeNodeAttributes(`0-${col}`, { borderSize: 0.05 + 0.35 * k });
      graph.mergeNodeAttributes(`1-${col}`, { borderSize: 0.08 + 0.12 * k, ringSize: 0.06 + 0.12 * k });
      graph.mergeNodeAttributes(`2-${col}`, { borderSize: 0.1, pixelSize: 1 + 9 * k });
    }
  };

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // Variables make border sizes and colours first-class style properties.
        variables: {
          borderSize: { type: 'number', default: 0 },
          borderColor: { type: 'color', default: 'transparent' },
          ringSize: { type: 'number', default: 0 },
          ringColor: { type: 'color', default: 'transparent' },
          pixelSize: { type: 'number', default: 0 },
          pixelColor: { type: 'color', default: 'transparent' },
        },
        layers: [
          layerFill(),
          layerBorder({
            // Borders are listed from the outermost to the innermost; `fill` takes the remaining space.
            borders: [
              // A border read from an attribute that is 0 disables the whole layer, so the first
              // one is the one every node uses.
              { size: { attribute: 'borderSize' }, color: { attribute: 'borderColor' }, mode: 'relative' },
              { size: { attribute: 'ringSize' }, color: { attribute: 'ringColor' }, mode: 'relative' },
              { size: { attribute: 'pixelSize' }, color: { attribute: 'pixelColor' }, mode: 'pixels' },
              { size: 0, color: { attribute: 'color' }, fill: true },
            ],
          }),
        ],
      },
    },
    styles: {
      nodes: {
        color: { attribute: 'color' },
        size: { attribute: 'size' },
        borderSize: { attribute: 'borderSize', defaultValue: 0 },
        borderColor: { attribute: 'borderColor', defaultValue: 'transparent' },
        ringSize: { attribute: 'ringSize', defaultValue: 0 },
        ringColor: { attribute: 'ringColor', defaultValue: 'transparent' },
        pixelSize: { attribute: 'pixelSize', defaultValue: 0 },
        pixelColor: { attribute: 'pixelColor', defaultValue: 'transparent' },
      },
    },
  });

  let frame = 0;
  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      const t = (now - start) / 900;
      apply(1, (col) => 0.5 + 0.5 * Math.sin(t + col * 0.9));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.05';
    slider.value = '0.6';
    const update = (): void => apply(Number(slider.value), (col) => (col + 1) / COLS);
    slider.addEventListener('input', update);
    update();
    controls.append('Border width ', slider, ' (rows: one border, two borders, relative plus fixed-pixel inner border; zoom to compare)');
    el.append(controls);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
