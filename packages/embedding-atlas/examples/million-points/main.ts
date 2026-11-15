// Two million points in one EmbeddingView: the component's stated scale
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll to zoom into any cluster: every point is there.' });
  // Cards stay light; the full view goes to the "few million" the docs promise.
  const count = stage.preview ? 100_000 : 2_000_000;
  const t0 = performance.now();
  const points = topicPoints({ count, topics: 8, noise: 0.05 });
  const made = performance.now() - t0;

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (!stage.preview) {
    const mb = ((points.x.byteLength + points.y.byteLength + points.category.byteLength) / 1e6).toFixed(0);
    readout(stage.box, `${count.toLocaleString()} points · ${mb} MB of typed arrays · generated in ${Math.round(made)} ms`);
  } else {
    stage.loop((_, t) => view.update({ viewportState: { x: 2 * Math.cos(t / 3), y: 2 * Math.sin(t / 3), scale: 0.08 + 0.05 * Math.sin(t / 2) ** 2 } }));
  }
  return stage.dispose;
};

export default mount;
