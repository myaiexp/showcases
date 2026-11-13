// Clamps zoom with minCameraRatio/maxCameraRatio and panning with cameraPanBoundaries
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = buildClusterGraph(5, 30);
  const renderer = new Sigma(graph, container, {
    settings: {
      // Ratio is "smaller = more zoomed in": 0.5 allows 2x in, 2 allows 2x out.
      minCameraRatio: 0.5,
      maxCameraRatio: 2,
      // Pan at most 50 pixels beyond the graph's bounding box.
      cameraPanBoundaries: { tolerance: 50 },
    },
  });
  const camera = renderer.getCamera();

  let timer = 0;
  if (preview) {
    // Ask for far more than the bounds allow: the camera stops at the limits.
    const moves = [
      { ratio: 0.01 },
      { ratio: 100 },
      { x: -5, y: 0.5, ratio: 0.5 },
      { x: 5, y: 0.5, ratio: 0.5 },
      { x: 0.5, y: 0.5, ratio: 1 },
    ];
    let i = 0;
    const step = (): void => {
      void camera.animate(moves[i % moves.length] ?? {}, { duration: 1200, easing: 'cubicInOut' });
      i++;
    };
    step();
    timer = window.setInterval(step, 1800);
    return () => {
      clearInterval(timer);
      renderer.kill();
    };
  }

  // Full view: the readout shows that requested values are clamped, not the ones actually applied.
  const controls = document.createElement('div');
  controls.className = 'controls';
  const readout = document.createElement('code');
  readout.className = 'readout';
  const show = (): void => {
    const { x, y, ratio } = camera.getState();
    readout.textContent = `ratio ${ratio.toFixed(2)} (0.5 to 2)  x ${x.toFixed(2)}  y ${y.toFixed(2)}`;
  };
  show();
  camera.on('updated', show);

  const requests: [string, Partial<{ x: number; y: number; ratio: number }>][] = [
    ['Zoom in to 0.01', { ratio: 0.01 }],
    ['Zoom out to 100', { ratio: 100 }],
    ['Pan far left', { x: -5 }],
    ['Pan far right', { x: 6 }],
    ['Reset', { x: 0.5, y: 0.5, ratio: 1 }],
  ];
  for (const [label, target] of requests) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', () => void camera.animate(target, { duration: 600 }));
    controls.append(button);
  }
  el.append(controls, readout);

  return () => {
    camera.off('updated', show);
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
