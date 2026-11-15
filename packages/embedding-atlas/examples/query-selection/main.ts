// querySelection: async lookup from pointer position to data point
import { EmbeddingView, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { pointIndex } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover for a tooltip, click to select, shift/cmd+click to add points.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });
  const index = pointIndex(points.x, points.y);
  const log = stage.preview ? () => {} : eventLog(stage.box);

  // Without querySelection the plain EmbeddingView has nothing to hover or click.
  // unitDistance is one pixel in data units, so "within 6 px" is 6 * unitDistance.
  const querySelection = async (x: number, y: number, unitDistance: number): Promise<DataPoint | null> => {
    const i = index.nearest(x, y, unitDistance * 6);
    if (i < 0) return null;
    return { x: points.x[i]!, y: points.y[i]!, category: points.category[i]!, text: points.text(i), identifier: i };
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    querySelection,
    onTooltip: (p) => p && log(`tooltip   #${p.identifier} ${points.names[p.category ?? 0]}: ${p.text}`),
    onSelection: (s) => log(`selection ${s?.length ?? 0} point(s): ${(s ?? []).map((p) => `#${p.identifier}`).join(' ')}`),
  });
  stage.own(view);

  // Cards have no pointer: ask querySelection the same question a hover would, and show the answer.
  if (stage.preview) {
    let k = 0;
    stage.every(1500, async () => {
      const [cx, cy] = points.centres[k++ % points.centres.length]!;
      const p = await querySelection(cx, cy, 0.05);
      if (!stage.disposed) view.update({ tooltip: p });
    });
  }
  return stage.dispose;
};

export default mount;
