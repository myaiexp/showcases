// customOverlay: DOM pins kept on cluster centres with proxy.location()
import { EmbeddingView, type OverlayProxy } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';
import './style.css';

interface Props {
  proxy: OverlayProxy;
  pins: { x: number; y: number; name: string }[];
}

// The view calls update() with a fresh proxy whenever the viewport moves.
class Pins {
  private els: HTMLDivElement[];
  constructor(target: HTMLDivElement, props: Props) {
    this.els = props.pins.map((p) => {
      const el = document.createElement('div');
      el.className = 'pin';
      el.textContent = p.name;
      target.append(el);
      return el;
    });
    this.update(props);
  }
  update({ proxy, pins }: Props): void {
    pins.forEach((p, i) => {
      const { x, y } = proxy.location(p.x, p.y);
      const el = this.els[i]!;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.display = x < 0 || y < 0 || x > proxy.width || y > proxy.height ? 'none' : '';
    });
  }
  destroy(): void {
    for (const el of this.els) el.remove();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan and zoom: the pins stay on their clusters.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const pins = points.centres.map(([x, y], i) => ({ x, y, name: points.names[i]! }));

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
    customOverlay: { class: Pins, props: { pins } },
  });
  stage.own(view);

  if (stage.preview) {
    stage.loop((_, t) => view.update({ viewportState: { x: 2 * Math.sin(t / 3), y: 1.5 * Math.cos(t / 4), scale: 0.09 + 0.04 * Math.sin(t / 2) ** 2 } }));
  }
  return stage.dispose;
};

export default mount;
