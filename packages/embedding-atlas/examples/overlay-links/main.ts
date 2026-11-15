// An overlay of curved links between cluster centres, weighted by shared words
import { EmbeddingView, type OverlayProxy } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints, TOPICS } from '../../shared/data.ts';

const SVG = 'http://www.w3.org/2000/svg';

interface Link {
  a: [number, number];
  b: [number, number];
  weight: number;
}

class Links {
  private svg = document.createElementNS(SVG, 'svg');
  constructor(target: HTMLDivElement, props: { proxy: OverlayProxy; links: Link[] }) {
    this.svg.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none';
    target.append(this.svg);
    this.update(props);
  }
  update({ proxy, links }: { proxy: OverlayProxy; links: Link[] }): void {
    this.svg.setAttribute('width', String(proxy.width));
    this.svg.setAttribute('height', String(proxy.height));
    this.svg.replaceChildren(
      ...links.map(({ a, b, weight }) => {
        const p = proxy.location(...a), q = proxy.location(...b);
        // Bend each link sideways by a fifth of its length.
        const mx = (p.x + q.x) / 2 - (q.y - p.y) / 5, my = (p.y + q.y) / 2 + (q.x - p.x) / 5;
        const path = document.createElementNS(SVG, 'path');
        path.setAttribute('d', `M${p.x},${p.y}Q${mx},${my} ${q.x},${q.y}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#e2e8f0');
        path.setAttribute('stroke-opacity', String(0.25 + 0.6 * weight));
        path.setAttribute('stroke-width', String(1 + 4 * weight));
        return path;
      }),
    );
  }
  destroy(): void {
    this.svg.remove();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Thicker links: the two topics share more vocabulary.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000, topics: 6 });

  // Topics sharing a word (chess and music both have "tempo") get a link; the rest get faint ones.
  const links: Link[] = [];
  for (let i = 0; i < points.names.length; i++) {
    for (let j = i + 1; j < points.names.length; j++) {
      const shared = TOPICS[i]!.words.filter((w) => TOPICS[j]!.words.includes(w)).length;
      const ring = j === i + 1 || (i === 0 && j === points.names.length - 1);
      if (shared || ring) links.push({ a: points.centres[i]!, b: points.centres[j]!, weight: shared ? 1 : 0.15 });
    }
  }

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    customOverlay: { class: Links, props: { links } },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: Math.cos(t / 3), y: Math.sin(t / 3), scale: 0.075 + 0.015 * Math.sin(t) } }));
  return stage.dispose;
};

export default mount;
