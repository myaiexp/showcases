// One red-bordered contour per community with @sigma/layer-webgl's bindWebGLLayer + createContoursProgram
import { bindWebGLLayer, createContoursProgram } from '@sigma/layer-webgl';
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { clusteredGraph } from './data.ts';
import { checkbox, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  const { graph, communities } = clusteredGraph(preview ? 4 : 5, preview ? 25 : 40);

  // A layer binds to one of the declared depth layers, so declare a dedicated one
  // below the nodes and edges.
  const renderer = new Sigma(graph, container, {
    primitives: {
      depthLayers: ['edges', 'community-highlight', 'topEdges', 'nodes', 'topNodes'],
    },
  });

  // Each community owns an independent layer. The explicit id makes re-binding replace it.
  const cleanups = new Map<number, () => void>();
  const show = (id: number): void => {
    const community = communities[id];
    if (!community || cleanups.has(id)) return;
    cleanups.set(
      id,
      bindWebGLLayer(
        'community-highlight',
        renderer,
        createContoursProgram(community.nodes, {
          radius: 45,
          border: { color: community.color, thickness: 4 },
          levels: [{ color: `${community.color}33`, threshold: 0.5 }],
        }),
        `contour-${id}`,
      ),
    );
  };
  const hide = (id: number): void => {
    cleanups.get(id)?.();
    cleanups.delete(id);
  };
  communities.forEach((c) => show(c.id));

  let timer = 0;
  if (preview) {
    // No pointer in a card: switch the contours off and on one community at a time.
    let step = 0;
    timer = window.setInterval(() => {
      const id = Math.floor(step / 2) % communities.length;
      if (step % 2 === 0) hide(id);
      else show(id);
      step++;
    }, 900);
  } else {
    const row = controlsRow(el);
    communities.forEach((c) => {
      row.append(
        checkbox(`Community ${c.id + 1}`, true, (on) => {
          if (on) show(c.id);
          else hide(c.id);
        }),
      );
    });
  }

  return () => {
    window.clearInterval(timer);
    cleanups.forEach((clean) => clean());
    cleanups.clear();
    renderer.kill();
  };
};

export default mount;
