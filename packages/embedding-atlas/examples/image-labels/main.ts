// Image labels: label content as an image with width and height
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';
import { topicBadge } from './badge.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });

  // content: { image, width, height } — the image is a data URL drawn in code, so nothing is fetched.
  const labels: Label[] = points.centres.map(([x, y], i) => ({
    x,
    y,
    content: { image: topicBadge(points.names[i]!, i), width: 72, height: 40 },
    level: 0,
  }));

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) {
    stage.loop((_, t) => view.update({ viewportState: { x: Math.sin(t / 3), y: 0, scale: 0.075 + 0.025 * Math.sin(t / 2) } }));
  }
  return stage.dispose;
};

export default mount;
