// width and height are props: resize the view by updating them
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });

  // The view never measures its container: it is exactly width × height CSS pixels.
  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center';
  const target = document.createElement('div');
  target.style.cssText = 'outline:1px dashed #475569';
  holder.append(target);
  stage.view.append(holder);

  let size = { width: Math.round(stage.width * 0.6), height: Math.round(stage.height * 0.6) };
  const view = new EmbeddingView(target, {
    data: { x: points.x, y: points.y, category: points.category },
    ...size,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  const resize = (w: number, h: number): void => {
    size = { width: Math.round(w), height: Math.round(h) };
    view.update(size);
  };
  if (stage.bar) {
    slider(stage.bar, 'width', 120, stage.width, 10, size.width, (w) => resize(w, size.height), (v) => `${v}px`);
    slider(stage.bar, 'height', 100, stage.height, 10, size.height, (h) => resize(size.width, h), (v) => `${v}px`);
  }
  if (stage.preview) {
    stage.loop((_, t) => resize(stage.width * (0.55 + 0.4 * Math.sin(t) ** 2), stage.height * (0.55 + 0.4 * Math.cos(t * 0.7) ** 2)));
  }
  return stage.dispose;
};

export default mount;
