// Container layout: a ResizeObserver on the container feeds width() and height(), so the graph follows its box
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the bottom-right corner of the box to resize it.' });
  const box = stage.container;
  const W = stage.width;
  const H = stage.height;

  const graph = stage.own(new ForceGraph(box)).graphData(randomTree(stage.preview ? 40 : 90, 5)).backgroundColor('#ffffff');

  if (!stage.preview) {
    // CSS resize makes the box draggable; the observer below is what the graph listens to.
    Object.assign(box.style, { resize: 'both', overflow: 'hidden', minWidth: '140px', minHeight: '120px', maxWidth: '100%' });
  }

  // Setting width/height clears the canvas until the next frame, so resizing on every frame of a drag
  // flickers: apply the latest size at most every 120 ms instead.
  let timer = 0;
  let last = 0;
  const apply = (): void => {
    last = performance.now();
    const w = box.clientWidth;
    const h = box.clientHeight;
    if (w < 2 || h < 2 || (w === graph.width() && h === graph.height())) return;
    graph.width(w).height(h).zoomToFit(0, 12);
  };
  const observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(apply, Math.max(0, 120 - (performance.now() - last)));
  });
  observer.observe(box);
  stage.onDispose(() => {
    observer.disconnect();
    clearTimeout(timer);
  });

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 12));
    // Nobody can drag the corner in a card: change the box itself and let the observer do the rest.
    const steps: [number, number][] = [[1, 1], [0.55, 0.7], [0.8, 0.45], [0.4, 1]];
    let i = 0;
    stage.after(3000, () => {
      stage.every(1400, () => {
        const [fw, fh] = steps[++i % steps.length]!;
        box.style.width = `${Math.round(W * fw)}px`;
        box.style.height = `${Math.round(H * fh)}px`;
      });
    });
  } else {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 12));
  }

  return stage.dispose;
};

export default mount;
