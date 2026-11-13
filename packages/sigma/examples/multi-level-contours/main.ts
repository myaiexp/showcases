// Layered threshold fills from createContoursProgram: a topographic look around each community
import { bindWebGLLayer, createContoursProgram } from '@sigma/layer-webgl';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { clusteredGraph } from './data.ts';
import { controlsRow, slider } from './ui.ts';
import './style.css';

// Thresholds go from the outermost level to the innermost; more levels = more rings.
const LEVELS = [0.15, 0.35, 0.55, 0.75, 0.9];

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const { graph, communities } = clusteredGraph(preview ? 3 : 4, preview ? 30 : 50, 21);

  const renderer = new Sigma(graph, container, {
    primitives: { depthLayers: ['edges', 'contours', 'topEdges', 'nodes', 'topNodes'] },
  });

  let clean: Array<() => void> = [];
  const draw = (levelCount: number, radius: number): void => {
    clean.forEach((fn) => fn());
    // Each level gets a bit more opaque than the last, so the centre reads as the "peak".
    const levels = LEVELS.slice(0, levelCount).map((threshold, i) => ({
      threshold,
      color: `rgba(39, 125, 161, ${0.1 + (0.5 * i) / Math.max(1, levelCount - 1)})`,
    }));
    clean = communities.map((c) =>
      bindWebGLLayer(
        'contours',
        renderer,
        createContoursProgram(c.nodes, {
          radius,
          levels,
          border: { color: '#277da1', thickness: 2 },
        }),
      ),
    );
  };

  let levelCount = 3;
  let radius = 40;
  draw(levelCount, radius);

  let timer = 0;
  if (preview) {
    // Grow the stack of levels from one to five, then start over.
    timer = window.setInterval(() => {
      levelCount = (levelCount % LEVELS.length) + 1;
      draw(levelCount, radius);
    }, 1100);
  } else {
    const row = controlsRow(el);
    row.append(
      slider('Levels', [1, LEVELS.length, 1, levelCount], (v) => {
        levelCount = v;
        draw(levelCount, radius);
      }),
      slider('Radius', [15, 80, 5, radius], (v) => {
        radius = v;
        draw(levelCount, radius);
      }),
    );
  }

  return () => {
    window.clearInterval(timer);
    clean.forEach((fn) => fn());
    renderer.kill();
  };
};

export default mount;
