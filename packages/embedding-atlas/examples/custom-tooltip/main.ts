// customTooltip: a class that renders the tooltip, plus props of your own
import { EmbeddingView, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, topicPoints } from '../../shared/data.ts';
import { dataPoint, pointIndex } from '../../shared/query.ts';
import './style.css';

interface TipProps {
  tooltip: DataPoint;
  names: string[];
  accent: string;
}

// Mounted once into the tooltip's element, then updated as the hovered point changes.
class TopicTooltip {
  private root = document.createElement('div');
  constructor(target: HTMLDivElement, props: TipProps) {
    this.root.className = 'tip';
    target.append(this.root);
    this.update(props);
  }
  update({ tooltip, names, accent }: TipProps): void {
    this.root.style.borderColor = accent;
    const head = document.createElement('div');
    head.className = 'head';
    head.style.color = accent;
    head.textContent = `${names[tooltip.category ?? 0]} · #${tooltip.identifier}`;
    const body = document.createElement('div');
    body.textContent = tooltip.text ?? '';
    const pos = document.createElement('div');
    pos.className = 'pos';
    pos.textContent = `x ${tooltip.x.toFixed(2)}, y ${tooltip.y.toFixed(2)}`;
    this.root.replaceChildren(head, body, pos);
  }
  destroy(): void {
    this.root.remove();
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
    // `props` are merged into what the class receives, next to `tooltip`.
    customTooltip: { class: TopicTooltip, props: { names: points.names, accent: '#f59e0b' } },
  });
  stage.own(view);

  const r = rng(9);
  if (stage.preview) stage.every(1600, () => view.update({ tooltip: dataPoint(points, Math.floor(r() * points.count)) }));
  return stage.dispose;
};

export default mount;
