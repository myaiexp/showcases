// A richer tooltip: a small bar chart of where the hovered point's words occur
import { EmbeddingView, defaultCategoryColors, type DataPoint } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, topicPoints, TOPICS } from '../../shared/data.ts';
import { dataPoint, pointIndex } from '../../shared/query.ts';

interface Props {
  tooltip: DataPoint;
  colors: string[];
}

// For each topic, how many of the point's words belong to that topic's vocabulary.
class WordBars {
  private svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  constructor(target: HTMLDivElement, props: Props) {
    this.svg.setAttribute('width', '180');
    this.svg.setAttribute('height', '96');
    this.svg.style.cssText = 'display:block;background:rgba(2,6,23,0.92);border:1px solid #334155;border-radius:6px';
    target.append(this.svg);
    this.update(props);
  }
  update({ tooltip, colors }: Props): void {
    const words = (tooltip.text ?? '').split(' ');
    const counts = TOPICS.slice(0, 6).map((t) => words.filter((w) => t.words.includes(w)).length);
    const max = Math.max(1, ...counts);
    const parts = counts.map((n, i) => {
      const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bar.setAttribute('x', String(10 + i * 27));
      bar.setAttribute('width', '20');
      bar.setAttribute('y', String(70 - (n / max) * 50));
      bar.setAttribute('height', String((n / max) * 50 + 0.5));
      bar.setAttribute('fill', colors[i]!);
      return bar;
    });
    const caption = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    caption.setAttribute('x', '10');
    caption.setAttribute('y', '88');
    caption.setAttribute('fill', '#cbd5e1');
    caption.setAttribute('font-size', '10');
    caption.textContent = `point #${tooltip.identifier}: words per topic`;
    this.svg.replaceChildren(...parts, caption);
  }
  destroy(): void {
    this.svg.remove();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: bars count its words from each topic\'s vocabulary.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const index = pointIndex(points.x, points.y);
  const colors = defaultCategoryColors(6);

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    querySelection: async (x, y, unit) => {
      const i = index.nearest(x, y, unit * 6);
      return i < 0 ? null : dataPoint(points, i);
    },
    customTooltip: { class: WordBars, props: { colors } },
  });
  stage.own(view);

  const r = rng(5);
  if (stage.preview) stage.every(1500, () => view.update({ tooltip: dataPoint(points, Math.floor(r() * points.count)) }));
  return stage.dispose;
};

export default mount;
