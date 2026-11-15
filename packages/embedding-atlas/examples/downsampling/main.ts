// downsampleMaxPoints: render a capped, density-aware sample of what is in view
import { EmbeddingView, type EmbeddingViewConfig } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const CAPS = ['10000', '100000', '1000000', 'null (off)'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in: the cap applies to the points inside the viewport, so detail returns.' });
  const points = topicPoints({ count: stage.preview ? 200000 : 1500000, topics: 8 });

  const config = (cap: (typeof CAPS)[number]): EmbeddingViewConfig => ({
    colorScheme: 'dark',
    downsampleMaxPoints: cap.startsWith('null') ? null : Number(cap),
  });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: config('10000'),
  });
  stage.own(view);

  if (stage.bar) select(stage.bar, 'downsampleMaxPoints', CAPS, (c) => view.update({ config: config(c) }));
  let i = 0;
  if (stage.preview) stage.every(2000, () => view.update({ config: config(CAPS[(i = (i + 1) % 3)]!) }));
  return stage.dispose;
};

export default mount;
