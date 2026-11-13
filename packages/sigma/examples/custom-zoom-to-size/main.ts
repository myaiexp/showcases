// Custom zoom-to-size: swap zoomToSizeRatioFunction while the camera zooms in and out
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildGraph } from './data.ts';
import { button, controlsRow, readout } from './ui.ts';
import './style.css';

// The three functions shown on the docs page.
const FUNCTIONS: Record<string, (ratio: number) => number> = {
  'Math.sqrt (default)': Math.sqrt,
  '() => 1 (constant)': () => 1,
  '(ratio) => ratio (linear)': (ratio) => ratio,
};

const mount: Mount = (el, { preview }) => {
  const stageWrap = document.createElement('div');
  stageWrap.className = 'stage-wrap';
  const container = document.createElement('div');
  container.className = 'stage';
  stageWrap.append(container);
  el.append(stageWrap);

  const graph = buildGraph(preview ? 10 : 16);
  const names = Object.keys(FUNCTIONS);

  const renderer = new Sigma(graph, container, {
    settings: { autoRescaleContent: 'nodes', zoomToSizeRatioFunction: Math.sqrt },
    styles: {
      nodes: { x: { attribute: 'x' }, y: { attribute: 'y' }, size: 2.6, color: '#277da1' },
      edges: { color: '#ccc', size: 0.3 },
    },
  });
  const camera = renderer.getCamera();

  let current = 0;
  const caption = document.createElement('div');
  caption.className = 'caption';
  stageWrap.append(caption);

  const choose = (index: number): void => {
    current = index;
    const name = names[index] ?? '';
    renderer.setSetting('zoomToSizeRatioFunction', FUNCTIONS[name] ?? Math.sqrt);
    caption.textContent = `zoomToSizeRatioFunction: ${name}`;
  };
  choose(0);

  // Camera ratio below 1 zooms in, above 1 zooms out. Loop in, out, then switch function.
  let timer = 0;
  let zoomedIn = false;
  const step = (): void => {
    zoomedIn = !zoomedIn;
    void camera.animate({ ratio: zoomedIn ? 0.25 : 1 }, { duration: 1400 });
    if (!zoomedIn && preview) choose((current + 1) % names.length);
  };
  if (preview) {
    timer = window.setInterval(step, 1800);
  } else {
    const row = controlsRow(el);
    names.forEach((name, i) => button(row, name, () => choose(i)));
    button(row, 'Zoom in / out', step);
    readout(row, 'Scroll to zoom too. Compare how node and edge sizes follow the camera.');
  }

  return () => {
    window.clearInterval(timer);
    renderer.kill();
  };
};

export default mount;
