// The selection prop: highlight a set of points chosen in code
import { EmbeddingView, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { dataPoint } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });

  // The 25 points nearest to a topic's centre, as DataPoints.
  const coreOf = (topic: number): DataPoint[] => {
    const [cx, cy] = points.centres[topic]!;
    const ids = Array.from({ length: points.count }, (_, i) => i).filter((i) => points.category[i] === topic);
    ids.sort((a, b) => (points.x[a]! - cx) ** 2 + (points.y[a]! - cy) ** 2 - ((points.x[b]! - cx) ** 2 + (points.y[b]! - cy) ** 2));
    return ids.slice(0, 25).map((i) => dataPoint(points, i));
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    selection: coreOf(0),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  const show = (t: number): void => view.update({ selection: t < 0 ? null : coreOf(t) });
  if (stage.bar) select(stage.bar, 'select the core of', [...points.names, 'nothing'], (v) => show(points.names.indexOf(v)));
  let t = 0;
  if (stage.preview) stage.every(1800, () => show((t = (t + 1) % points.names.length)));
  return stage.dispose;
};

export default mount;
