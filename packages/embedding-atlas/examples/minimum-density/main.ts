// minimumDensity: how dense an area must be before a density contour is drawn
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Low values outline even the sparse noise; high values keep only the cores.' });
  const points = topicPoints({ count: stage.preview ? 20000 : 150000, noise: 0.15 });

  // Points per square CSS pixel, averaged; 0.26's code falls back to 1/16 when it is left out.
  const config = (minimumDensity: number) => ({ colorScheme: 'dark' as const, mode: 'density' as const, minimumDensity });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: config(1 / 16),
  });
  stage.own(view);

  if (stage.bar) {
    slider(stage.bar, 'minimumDensity 2^', -10, 2, 0.5, -4, (e) => view.update({ config: config(2 ** e) }), (e) => `${e} = ${(2 ** e).toPrecision(2)}`);
  }
  if (stage.preview) stage.loop((_, t) => view.update({ config: config(2 ** (-4 + 4 * Math.sin(t / 1.5))) }));
  return stage.dispose;
};

export default mount;
