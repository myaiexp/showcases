// The labels prop: one text label per topic, placed at the topic's centre
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Labels keep their size as you zoom.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });

  // In 0.26 a label's text goes in `content` (the docs' prose still says `text`). Set level
  // even when every label shares one: a label without it only shows in a narrow zoom band.
  const labels: Label[] = points.centres.map(([x, y], i) => ({ x, y, content: points.names[i]!, level: 0 }));

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) {
    stage.loop((_, t) => view.update({ viewportState: { x: 0, y: 0, scale: 0.075 + 0.03 * Math.sin(t / 2) } }));
  }
  return stage.dispose;
};

export default mount;
