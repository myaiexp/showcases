// viewportState as a controlled prop: fly from cluster to cluster in code
import { EmbeddingView, type ViewportState } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a stop, or zoom and pan yourself: the readout follows onViewportState.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });

  // x, y: the viewport's centre in data units; scale maps data units to [-1, 1].
  const overview: ViewportState = { x: 0, y: 0, scale: 0.075 };
  const stops: ViewportState[] = [overview, ...points.centres.map(([x, y]) => ({ x, y, scale: 0.3 }))];
  let current = overview;
  const status = stage.preview ? null : readout(stage.box);
  const show = (v: ViewportState): void => {
    if (status) status.textContent = `x ${v.x.toFixed(2)}  y ${v.y.toFixed(2)}  scale ${v.scale.toFixed(3)}`;
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    viewportState: current,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onViewportState: (v) => {
      current = v;
      show(v);
    },
  });
  stage.own(view);

  // Ease from the current viewport to a stop; zoom is interpolated in log space so it feels even.
  let raf = 0;
  const flyTo = (to: ViewportState): void => {
    cancelAnimationFrame(raf);
    const from = current;
    const t0 = performance.now();
    const step = (now: number): void => {
      if (stage.disposed) return;
      const k = Math.min(1, (now - t0) / 1200);
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      current = {
        x: from.x + (to.x - from.x) * e,
        y: from.y + (to.y - from.y) * e,
        scale: from.scale * (to.scale / from.scale) ** e,
      };
      view.update({ viewportState: current });
      show(current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  stage.onDispose(() => cancelAnimationFrame(raf));

  if (stage.bar) {
    button(stage.bar, 'overview', () => flyTo(overview));
    points.names.forEach((name, i) => button(stage.bar!, name, () => flyTo(stops[i + 1]!)));
  }
  let i = 0;
  if (stage.preview) stage.every(2200, () => flyTo(stops[(i = (i + 1) % stops.length)]!));
  return stage.dispose;
};

export default mount;
