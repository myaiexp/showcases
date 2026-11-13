// Toggle antialiasEdges, hideEdgesOnMove and hideLabelsOnMove at runtime on a graph with ~20k edges
import Sigma from 'sigma';
import type { Mount } from '@/types.ts';
import { bigGraph } from './data.ts';
import { button, checkbox, controlsRow } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const container = document.createElement('div');
  container.className = 'stage';
  el.append(container);

  // Full view: 2,500 nodes and about 20k edges. Cards stay light.
  const graph = preview ? bigGraph(250, 600) : bigGraph(2500, 20000);

  const renderer = new Sigma(graph, container, {
    // The move-hiding switches start off, so the toggles show what turning them on changes.
    settings: { hideEdgesOnMove: false, hideLabelsOnMove: false, antialiasEdges: true },
  });
  const camera = renderer.getCamera();

  // These settings are read on the fly, so setSetting() applies them without a rebuild.
  const set = (name: 'antialiasEdges' | 'hideEdgesOnMove' | 'hideLabelsOnMove', value: boolean): void => {
    renderer.setSetting(name, value);
  };

  // Keep the camera moving: hide*OnMove only matters while it does.
  let zoomedIn = false;
  const sweep = (): void => {
    zoomedIn = !zoomedIn;
    void camera.animate(
      { ratio: zoomedIn ? 0.45 : 1, x: zoomedIn ? 0.6 : 0.5, y: zoomedIn ? 0.4 : 0.5 },
      { duration: 1800 },
    );
  };

  let timer = 0;
  if (preview) {
    // A badge names the active combination while the cycle runs.
    const badge = document.createElement('div');
    badge.className = 'badge';
    container.append(badge);
    const combos: Array<[boolean, boolean, boolean]> = [
      [true, false, false],
      [false, false, false],
      [false, true, false],
      [false, true, true],
    ];
    let i = 0;
    const step = (): void => {
      const [aa, he, hl] = combos[i % combos.length] ?? [true, false, false];
      set('antialiasEdges', aa);
      set('hideEdgesOnMove', he);
      set('hideLabelsOnMove', hl);
      badge.textContent = `antialiasEdges ${aa ? 'on' : 'off'} / hideEdgesOnMove ${he ? 'on' : 'off'}`;
      if (i % 2 === 0) sweep();
      i++;
    };
    step();
    timer = window.setInterval(step, 1900);
  } else {
    const row = controlsRow(el);
    const rate = document.createElement('span');
    rate.textContent = 'renders/s: 0';
    // Count renders per second: a rough stand-in for the GPU timing the docs measure with DEBUG_gpuTimerQueries.
    let renders = 0;
    renderer.on('afterRender', () => renders++);
    timer = window.setInterval(() => {
      rate.textContent = `renders/s: ${renders}`;
      renders = 0;
    }, 1000);
    row.append(
      checkbox('antialiasEdges', true, (v) => set('antialiasEdges', v)),
      checkbox('hideEdgesOnMove', false, (v) => set('hideEdgesOnMove', v)),
      checkbox('hideLabelsOnMove', false, (v) => set('hideLabelsOnMove', v)),
      button('Zoom in / out', sweep),
      rate,
      document.createTextNode(`${graph.order} nodes, ${graph.size} edges`),
    );
  }

  return () => {
    window.clearInterval(timer);
    camera.cancelAnimation();
    renderer.kill();
  };
};

export default mount;
