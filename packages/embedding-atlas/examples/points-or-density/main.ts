// Switching config.mode between "points" and "density" on the same view
import { EmbeddingView, type EmbeddingViewConfig } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 20000 : 100000 });

  const config = (mode: 'points' | 'density'): EmbeddingViewConfig => ({ colorScheme: 'dark', mode });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: config('points'),
  });
  stage.own(view);

  // config is one object: change a setting by passing a whole new one.
  const modes = ['points', 'density'] as const;
  if (stage.bar) select(stage.bar, 'mode', modes, (m) => view.update({ config: config(m) }));
  let i = 0;
  if (stage.preview) stage.every(2000, () => view.update({ config: config(modes[(i = 1 - i)]!) }));
  return stage.dispose;
};

export default mount;
