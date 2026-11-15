// The tooltip prop set from code: walk the tooltip from point to point
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';
import { rng, topicPoints } from '../../shared/data.ts';
import { dataPoint } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });
  const status = stage.preview ? null : readout(stage.box, 'tooltip: none');

  // tooltip is a DataPoint { x, y, category, text, identifier }; the default tooltip shows its text.
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    tooltip: dataPoint(points, 0),
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    onTooltip: (p) => {
      if (status) status.textContent = p ? `onTooltip: #${p.identifier} at (${p.x.toFixed(2)}, ${p.y.toFixed(2)})` : 'onTooltip: null';
    },
  });
  stage.own(view);

  const r = rng(4);
  const next = (): void => view.update({ tooltip: dataPoint(points, Math.floor(r() * points.count)) });
  if (stage.bar) {
    button(stage.bar, 'random point', next);
    button(stage.bar, 'clear', () => view.update({ tooltip: null }));
  }
  if (stage.preview) stage.every(1600, next);
  return stage.dispose;
};

export default mount;
