// Counts sigma's lifecycle events (process, render, clear, resize) as the graph and camera change
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { buildClusterGraph } from './data.ts';
import './style.css';

const EVENTS = ['beforeClear', 'afterClear', 'beforeProcess', 'afterProcess', 'beforeRender', 'afterRender', 'resize'] as const;

const mount: Mount = (el, { preview }) => {
  const frame = document.createElement('div');
  frame.className = 'frame';
  const container = document.createElement('div');
  container.className = 'stage';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  frame.append(container, overlay);
  el.append(frame);

  const graph = buildClusterGraph(4, 20);
  const renderer = new Sigma(graph, container);
  const camera = renderer.getCamera();

  // These events carry no payload, so a counter per name is all there is to record.
  const counts = Object.fromEntries(EVENTS.map((n) => [n, 0])) as Record<(typeof EVENTS)[number], number>;
  const show = (): void => {
    overlay.textContent = EVENTS.map((n) => `${n.padEnd(13)} ${counts[n]}`).join('\n');
  };
  for (const name of EVENTS) {
    renderer.on(name, () => {
      counts[name]++;
      show();
    });
  }
  show();

  let added = 0;
  // Adding a node makes sigma re-process its data; camera moves only re-render.
  const addNode = (): void => {
    graph.addNode(`extra-${added}`, {
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      size: 1.5,
      color: '#111',
    });
    added++;
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    const step = (): void => {
      if (i % 3 === 0) addNode();
      else void camera.animate({ ratio: i % 3 === 1 ? 0.6 : 1, x: 0.5, y: 0.5 }, { duration: 900 });
      i++;
    };
    timer = window.setInterval(step, 1300);
    return () => {
      clearInterval(timer);
      camera.cancelAnimation();
      renderer.kill();
    };
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const button = (label: string, onClick: () => void): void => {
    const b = document.createElement('button');
    b.textContent = label;
    b.addEventListener('click', onClick);
    controls.append(b);
  };
  button('Add a node (graph change)', addNode);
  button('zoomIn() (camera change)', () => void camera.zoomIn());
  button('reset()', () => void camera.reset());
  button('refresh()', () => renderer.refresh());
  button('resize(true)', () => renderer.resize(true));
  const hint = document.createElement('p');
  hint.textContent = 'Each action triggers a different mix of events: watch which counters move.';
  hint.style.color = 'var(--fg-3)';
  el.append(controls, hint);

  return () => {
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
