// An SVG overlay: one convex hull per topic, redrawn as the camera moves
import { EmbeddingView, defaultCategoryColors, type OverlayProxy } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';
import { convexHull } from './hull.ts';

const SVG = 'http://www.w3.org/2000/svg';

interface Props {
  proxy: OverlayProxy;
  hulls: [number, number][][];
  colors: string[];
}

class Hulls {
  private svg = document.createElementNS(SVG, 'svg');
  constructor(target: HTMLDivElement, props: Props) {
    this.svg.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none';
    target.append(this.svg);
    this.update(props);
  }
  update({ proxy, hulls, colors }: Props): void {
    this.svg.setAttribute('width', String(proxy.width));
    this.svg.setAttribute('height', String(proxy.height));
    const paths = hulls.map((hull, i) => {
      const path = document.createElementNS(SVG, 'path');
      const d = hull.map(([x, y], k) => {
        const p = proxy.location(x, y);
        return `${k ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      });
      path.setAttribute('d', `${d.join('')}Z`);
      path.setAttribute('fill', colors[i]!);
      path.setAttribute('fill-opacity', '0.08');
      path.setAttribute('stroke', colors[i]!);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('stroke-dasharray', '5 3');
      return path;
    });
    this.svg.replaceChildren(...paths);
  }
  destroy(): void {
    this.svg.remove();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 40000, noise: 0 });
  // Hulls of each topic's points, computed once in data coordinates.
  const hulls = points.names.map((_, t) => {
    const pts: [number, number][] = [];
    for (let i = 0; i < points.count; i += 3) if (points.category[i] === t) pts.push([points.x[i]!, points.y[i]!]);
    return convexHull(pts);
  });

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    customOverlay: { class: Hulls, props: { hulls, colors: defaultCategoryColors(points.names.length) } },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: Math.sin(t / 3) * 2, y: 0, scale: 0.07 + 0.02 * Math.sin(t / 2) } }));
  return stage.dispose;
};

export default mount;
