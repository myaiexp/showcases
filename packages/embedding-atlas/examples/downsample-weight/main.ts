// downsampleDensityWeight: how much harder dense areas are thinned
import { EmbeddingView, type EmbeddingViewConfig } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'At 0 every area is sampled alike; at 10 dense cores are thinned hardest.' });
  const points = topicPoints({ count: stage.preview ? 150000 : 800000, noise: 0.1 });

  // P(i) = (max / inView) * 2 / (1 + density(i) / maxDensity * weight), per the config docs.
  const config = (weight: number): EmbeddingViewConfig => ({
    colorScheme: 'dark',
    downsampleMaxPoints: 15000,
    downsampleDensityWeight: weight,
  });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: config(5),
  });
  stage.own(view);

  if (stage.bar) slider(stage.bar, 'downsampleDensityWeight', 0, 10, 0.5, 5, (w) => view.update({ config: config(w) }));
  if (stage.preview) stage.loop((_, t) => view.update({ config: config(5 + 5 * Math.sin(t / 1.5)) }));
  return stage.dispose;
};

export default mount;
