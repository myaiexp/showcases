// customTooltip as a bare class: no extra props, just the hovered point
import { EmbeddingView, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, topicPoints } from '../../shared/data.ts';
import { dataPoint, pointIndex } from '../../shared/query.ts';

// The shortest form: a class whose props hold only `tooltip`. update and destroy are optional.
class WordTooltip {
  private el = document.createElement('div');
  constructor(target: HTMLDivElement, props: { tooltip: DataPoint }) {
    this.el.style.cssText = 'padding:6px 10px;border-radius:999px;background:#f8fafc;color:#0f172a;font:600 12px system-ui;white-space:nowrap';
    target.append(this.el);
    this.update(props);
  }
  update({ tooltip }: { tooltip: DataPoint }): void {
    // Only the first word of the point's text.
    this.el.textContent = `“${(tooltip.text ?? '').split(' ')[0]}…”`;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const index = pointIndex(points.x, points.y);

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    querySelection: async (x, y, unit) => {
      const i = index.nearest(x, y, unit * 6);
      return i < 0 ? null : dataPoint(points, i);
    },
    customTooltip: WordTooltip,
  });
  stage.own(view);

  const r = rng(2);
  if (stage.preview) stage.every(1400, () => view.update({ tooltip: dataPoint(points, Math.floor(r() * points.count)) }));
  return stage.dispose;
};

export default mount;
