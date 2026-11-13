// ForceAtlas2 computed on the GPU in sigma's own WebGL context, with start/stop controls
import { ForceAtlas2GPULayout } from '@sigma/layout-fa2-gpu';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { communityGraph, scatter } from './data.ts';
import { button, controlsRow } from './ui.ts';
import './style.css';

// Half-width of the framed area, in position units (the 150-node preview settles smaller than the full graph).
const FRAME = { full: 70, preview: 30 };
const GRAVITY = 1;
const SCALING = 1;

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const graph = communityGraph(preview ? 150 : 700, preview ? 4 : 6);
  scatter(graph, 100, 1);

  const renderer = new Sigma(graph, container, { settings: { stagePadding: 20 } });
  // While the layout runs, positions live on the GPU and sigma's auto-rescale only knows the starting
  // scatter, so the graph would drift out of frame. Pin the framed area instead (positions units).
  const frame = preview ? FRAME.preview : FRAME.full;
  renderer.setCustomBBox({ x: [-frame, frame], y: [-frame, frame] });
  // The layout runs on the renderer's WebGL context, so it takes the renderer, not the graph.
  // Strong gravity pulls in proportion to distance, so the layout has a bounded extent and fits the frame.
  // The high slowDown damps each step: without it the strong pull overshoots and the graph blows up
  // after a few seconds of running.
  const layout = new ForceAtlas2GPULayout(renderer, {
    strongGravityMode: true,
    gravity: GRAVITY,
    scalingRatio: SCALING,
    slowDown: 10,
  });

  let round = 1;
  // Back to a random scatter, then run again. Stop first: the layout owns positions while running.
  const restart = (): void => {
    layout.stop();
    scatter(graph, 100, ++round);
    layout.start();
  };
  layout.start();

  let timer = 0;
  if (preview) {
    // Each cycle: run for a few seconds, then scatter and run again.
    timer = window.setInterval(restart, 4500);
  } else {
    const status = document.createElement('span');
    layout.on('started', () => (status.textContent = 'Running'));
    layout.on('stopped', ({ reason }) => (status.textContent = `Stopped (${reason})`));
    status.textContent = 'Running';
    const row = controlsRow(el);
    row.append(
      button('Start', () => layout.start()),
      // stop() writes the final positions back to the graph.
      button('Stop', () => layout.stop()),
      button('Scatter and restart', restart),
      status,
    );
  }

  return () => {
    window.clearInterval(timer);
    // kill() stops any run and releases the GPU resources the layout created.
    layout.kill();
    renderer.kill();
  };
};

export default mount;
