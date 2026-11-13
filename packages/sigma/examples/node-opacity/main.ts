// Fades nodes and edges through the `opacity` style property, bound to an attribute
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildGraph(preview ? 24 : 40);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes' },
    styles: {
      // opacity is a plain style property, so it binds to an attribute like color or size.
      nodes: { color: { attribute: 'color' }, size: { attribute: 'size' }, opacity: { attribute: 'opacity', defaultValue: 1 } },
      edges: { color: '#555', size: { attribute: 'size' }, opacity: { attribute: 'opacity', defaultValue: 1 } },
    },
  });

  // Writing the attribute is enough: sigma re-evaluates styles when graph attributes change.
  const setOpacity = (value: number): void => {
    graph.updateEachNodeAttributes((_node, attrs) => ({ ...attrs, opacity: value }));
    graph.updateEachEdgeAttributes((_edge, attrs) => ({ ...attrs, opacity: value }));
  };

  let frame = 0;
  const readout = document.createElement('span');
  readout.className = 'readout';

  if (preview) {
    const start = performance.now();
    const tick = (now: number): void => {
      setOpacity(0.55 + 0.45 * Math.sin((now - start) / 700));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0.05';
    slider.max = '1';
    slider.step = '0.05';
    slider.value = '0.5';
    const update = (): void => {
      setOpacity(Number(slider.value));
      readout.textContent = `opacity: ${Number(slider.value).toFixed(2)}`;
    };
    slider.addEventListener('input', update);
    update();
    controls.append('Opacity ', slider, readout);
    el.append(controls);
  }

  return () => {
    cancelAnimationFrame(frame);
    renderer.kill();
  };
};

export default mount;
