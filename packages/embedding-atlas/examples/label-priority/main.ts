// Label priority: when labels collide, the higher priority one is placed
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints, TOPICS } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each cluster has a crowd of labels on one spot; priority picks who shows.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });

  // Six labels stacked almost on top of each other per topic; only one fits.
  const crowd = (favourite: number): Label[] =>
    points.centres.flatMap(([x, y], t) =>
      TOPICS[t]!.words.slice(0, 6).map((word, k) => ({
        x: x + k * 0.02,
        y: y + k * 0.02,
        content: word,
        level: 0,
        priority: k === favourite ? 10 : 1,
      })),
    );

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    labels: crowd(0),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  const pick = (k: number): void => view.update({ labels: crowd(k) });
  if (stage.bar) select(stage.bar, 'priority 10 goes to word', ['1', '2', '3', '4', '5', '6'], (v) => pick(Number(v) - 1));
  let k = 0;
  if (stage.preview) stage.every(2000, () => pick((k = (k + 1) % 6)));
  return stage.dispose;
};

export default mount;
