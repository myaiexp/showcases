// Custom style variables: borderSize and borderColor declared in primitives, then bound in styles
import { layerBorder } from '@sigma/node-border';
import Sigma from 'sigma';
import { layerFill } from 'sigma/rendering';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { controlsRow, readout } from './ui.ts';
import './style.css';

const PALETTE: Record<string, string> = {
  science: '#2a9d8f',
  art: '#e76f51',
  tech: '#277da1',
  sport: '#c9a227',
};

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 12 : 22);
  graph.forEachNode((node, attrs) => {
    // The data carries the variable values; styles below read them back.
    graph.mergeNodeAttributes(node, {
      color: PALETTE[String(attrs['community'])] ?? '#666',
      borderSize: attrs['important'] ? 0.3 : 0.08,
      borderColor: attrs['important'] ? '#111' : '#ffffff',
    });
  });

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    primitives: {
      nodes: {
        // Variables are typed attributes that layers can consume...
        variables: {
          borderSize: { type: 'number', default: 0 },
          borderColor: { type: 'color', default: 'transparent' },
        },
        layers: [
          layerFill(),
          layerBorder({
            borders: [
              { size: { attribute: 'borderSize' }, color: { attribute: 'borderColor' } },
              { size: 0, color: { attribute: 'color' }, fill: true },
            ],
          }),
        ],
      },
    },
    // ...and they also become style properties, usable with any value type.
    styles: {
      nodes: {
        x: { attribute: 'x' },
        y: { attribute: 'y' },
        size: 2.6,
        color: { attribute: 'color', defaultValue: '#666' },
        label: { attribute: 'label' },
        borderSize: { attribute: 'borderSize', defaultValue: 0 },
        borderColor: {
          whenState: 'isHovered',
          then: '#e22653',
          else: { attribute: 'borderColor', defaultValue: 'transparent' },
        },
      },
      edges: { size: 0.3, color: '#ccc' },
    },
  });

  let timer = 0;
  let readoutEl: HTMLOutputElement | null = null;
  if (preview) {
    // No pointer in a card: pulse the border attribute of the important nodes instead.
    let wide = false;
    timer = window.setInterval(() => {
      wide = !wide;
      graph.forEachNode((node, attrs) => {
        if (attrs['important']) graph.setNodeAttribute(node, 'borderSize', wide ? 0.45 : 0.08);
      });
    }, 900);
  } else {
    const row = controlsRow(el);
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '0.45';
    slider.step = '0.01';
    slider.value = '0.3';
    readoutEl = readout(row, 'Border of important nodes: 0.30. Hover a node to recolor its border.');
    const onInput = (): void => {
      graph.forEachNode((node, attrs) => {
        if (attrs['important']) graph.setNodeAttribute(node, 'borderSize', Number(slider.value));
      });
      if (readoutEl) readoutEl.textContent = `Border of important nodes: ${Number(slider.value).toFixed(2)}. Hover a node to recolor its border.`;
    };
    slider.addEventListener('input', onInput);
    row.prepend(slider);
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
