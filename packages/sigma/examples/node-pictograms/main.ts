// layerImage from @sigma/node-image: tinted SVG pictograms and untouched pictures, built as data: URLs
import { layerImage } from '@sigma/node-image';
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerFill } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { ICON_NAMES, pictogram, scene } from './icons.ts';
import './style.css';

const TINTS = ['#e22653', '#277da1', '#2a9d8f', '#f4a261', '#8e5ea2', '#d1495b'];
// Sky, sun, hill and shade colours of the four pictures.
const SCENES: [string, string, string, string][] = [
  ['#cfe8f7', '#f9c74f', '#2d6a4f', '#1b4332'],
  ['#fde2e4', '#f94144', '#6d597a', '#355070'],
  ['#e9edc9', '#f8961e', '#bc6c25', '#783f10'],
  ['#d8e2dc', '#ffb703', '#277da1', '#1d3557'],
];
const SOFT = ['#fbd3dc', '#cfe3ee', '#cdebe7', '#fce3cf', '#e3d5ec', '#f6d0d5'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  ICON_NAMES.forEach((name, i) => {
    graph.addNode(`icon-${i}`, {
      x: i * 6,
      y: 3.5,
      size: 2.6,
      color: SOFT[i],
      pictogram: pictogram(name),
      pictogramColor: TINTS[i],
      label: name,
    });
  });
  SCENES.forEach((colors, i) => {
    graph.addNode(`scene-${i}`, { x: 4.5 + i * 7, y: -3.5, size: 3, color: '#ddd', image: scene(...colors) });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // Layers only see declared variables, so every attribute they read is declared here.
        variables: {
          image: { type: 'string', default: '' },
          pictogram: { type: 'string', default: '' },
          pictogramColor: { type: 'color', default: '#000000' },
        },
        layers: [
          layerFill(),
          // Each image layer has its own name and attribute; nodes without an image there skip the layer.
          layerImage({ name: 'scenes', drawingMode: 'image', imageAttribute: 'image' }),
          layerImage({
            name: 'pictograms',
            drawingMode: 'color',
            imageAttribute: 'pictogram',
            colorAttribute: 'pictogramColor',
            padding: 0.2,
          }),
        ],
      },
    },
    styles: {
      nodes: {
        color: { attribute: 'color' },
        size: { attribute: 'size' },
        image: { attribute: 'image', defaultValue: '' },
        pictogram: { attribute: 'pictogram', defaultValue: '' },
        pictogramColor: { attribute: 'pictogramColor', defaultValue: '#000000' },
        label: { attribute: 'label' },
        labelVisibility: 'visible',
        labelPosition: 'below',
      },
    },
  });

  // Shift icons and tints along the row: the same few images are reused, so they stay cached.
  let shift = 0;
  const rotate = (): void => {
    shift++;
    ICON_NAMES.forEach((_, i) => {
      const k = (i + shift) % ICON_NAMES.length;
      graph.mergeNodeAttributes(`icon-${i}`, {
        pictogram: pictogram(ICON_NAMES[k] ?? 'star'),
        pictogramColor: TINTS[(i + shift * 2) % TINTS.length],
        label: ICON_NAMES[k],
      });
    });
  };
  const timer = window.setInterval(rotate, preview ? 1400 : 2000);

  if (!preview) {
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append('Top: drawingMode "color" with padding 0.2. Bottom: drawingMode "image".');
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
