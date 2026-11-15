// colorScheme: the same data in the light and the dark scheme side by side
import { EmbeddingView, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const labels: Label[] = points.centres.map(([x, y], i) => ({ x, y, content: points.names[i]!, level: 0 }));
  const half = Math.floor(stage.width / 2) - 2;

  const views = (['light', 'dark'] as const).map((colorScheme, i) => {
    const pane = document.createElement('div');
    pane.style.cssText = `position:absolute;top:0;left:${i * (half + 4)}px;width:${half}px;height:100%;background:${colorScheme === 'light' ? '#fff' : '#000'}`;
    stage.view.append(pane);
    // The scheme switches the view's own chrome and label colours; 0.26 defaults to light.
    return stage.own(
      new EmbeddingView(pane, {
        data: { x: points.x, y: points.y, category: points.category },
        labels,
        width: half,
        height: stage.height,
        config: { colorScheme },
      }),
    );
  });

  if (stage.preview) {
    stage.loop((_, t) => {
      for (const v of views) v.update({ viewportState: { x: Math.sin(t / 3) * 2, y: 0, scale: 0.09 } });
    });
  }
  return stage.dispose;
};

export default mount;
