// Fill, border and image layers composited in declaration order; toggled by giving nodes data or not
import { layerBorder } from '@sigma/node-border';
import { layerImage } from '@sigma/node-image';
import Graph from 'graphology';
import Sigma from 'sigma';
import { layerFill } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { ICONS, pictogram } from './icons.ts';
import './style.css';

const COLORS = ['#e22653', '#277da1', '#2a9d8f', '#f4a261', '#8e5ea2', '#d1495b'];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = new Graph();
  ICONS.forEach((_, i) => {
    const angle = (i / ICONS.length) * Math.PI * 2;
    graph.addNode(`n${i}`, {
      x: 12 * Math.cos(angle),
      y: 12 * Math.sin(angle),
      size: 4.5,
      color: COLORS[i],
      iconColor: '#ffffff',
      borderSize: 0,
    });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // Layers only read declared variables, so the border size and the image attributes are declared.
        variables: {
          borderSize: { type: 'number', default: 0 },
          image: { type: 'string', default: '' },
          iconColor: { type: 'color', default: '#ffffff' },
        },
        // Back to front: the border is drawn over the fill, the image over both.
        layers: [
          layerFill(),
          layerBorder({
            borders: [
              { size: { attribute: 'borderSize' }, color: '#1d1d1f' },
              // The remaining space keeps the node colour (and is skipped while borderSize is 0).
              { size: 0, color: { attribute: 'color' }, fill: true },
            ],
          }),
          layerImage({ drawingMode: 'color', colorAttribute: 'iconColor', padding: 0.25 }),
        ],
      },
    },
    styles: {
      nodes: {
        color: { attribute: 'color' },
        size: { attribute: 'size' },
        borderSize: { attribute: 'borderSize', defaultValue: 0 },
        image: { attribute: 'image', defaultValue: '' },
        iconColor: { attribute: 'iconColor', defaultValue: '#ffffff' },
      },
    },
  });

  // A layer with no data for a node renders nothing, so switching one on or off is a data change.
  const setLayers = (border: boolean, image: boolean): void => {
    ICONS.forEach((icon, i) => {
      graph.mergeNodeAttributes(`n${i}`, { borderSize: border ? 0.14 : 0 });
      if (image) graph.setNodeAttribute(`n${i}`, 'image', pictogram(icon));
      else graph.removeNodeAttribute(`n${i}`, 'image');
    });
  };

  let timer = 0;
  const controls = document.createElement('div');
  controls.className = 'controls';
  const readout = document.createElement('span');
  readout.className = 'readout';
  const describe = (border: boolean, image: boolean): string =>
    ['layerFill()', border ? 'layerBorder()' : null, image ? 'layerImage()' : null].filter(Boolean).join(' + ');

  if (preview) {
    const stages: [boolean, boolean][] = [[false, false], [true, false], [true, true], [false, true]];
    let step = 0;
    const next = (): void => {
      const [border, image] = stages[step++ % stages.length] ?? [false, false];
      setLayers(border, image);
    };
    next();
    timer = window.setInterval(next, 1300);
  } else {
    const boxes = (['border', 'image'] as const).map((name) => {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = true;
      box.addEventListener('change', update);
      label.append(box, ` ${name} layer`);
      controls.append(label);
      return box;
    });
    function update(): void {
      const border = boxes[0]?.checked ?? false;
      const image = boxes[1]?.checked ?? false;
      setLayers(border, image);
      readout.textContent = describe(border, image);
    }
    controls.append(readout);
    update();
    el.append(controls);
  }

  return () => {
    clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
