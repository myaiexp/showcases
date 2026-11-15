// pointSize overrides the size the view would pick from the density
import { EmbeddingView, type EmbeddingViewConfig } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 5000 : 20000 });

  let size = 4;
  let auto = false;
  const config = (): EmbeddingViewConfig => ({ colorScheme: 'dark', pointSize: auto ? null : size });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: config(),
  });
  stage.own(view);

  if (stage.bar) {
    slider(stage.bar, 'pointSize', 0.5, 12, 0.5, size, (v) => {
      size = v;
      view.update({ config: config() });
    });
    checkbox(stage.bar, 'automatic (null)', auto, (v) => {
      auto = v;
      view.update({ config: config() });
    });
  }
  if (stage.preview) {
    stage.loop((_, t) => {
      size = 1 + 5 * Math.sin(t) ** 2;
      view.update({ config: config() });
    });
  }
  return stage.dispose;
};

export default mount;
