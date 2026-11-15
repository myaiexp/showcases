// pixelRatio: the same view at 0.5, 1 and 2 canvas pixels per CSS pixel
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const RATIOS = [0.5, 1, 2] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300 });
  const points = topicPoints({ count: stage.preview ? 6000 : 30000 });
  const w = Math.floor(stage.width / 3) - 4;

  const views: EmbeddingView[] = [];
  RATIOS.forEach((pixelRatio, i) => {
    const pane = document.createElement('div');
    pane.style.cssText = `position:absolute;top:0;left:${i * (w + 6)}px;width:${w}px;height:100%`;
    const caption = document.createElement('div');
    caption.textContent = `pixelRatio ${pixelRatio}`;
    caption.style.cssText = 'position:absolute;left:6px;top:4px;font:11px ui-monospace,monospace;color:#cbd5e1;z-index:1;pointer-events:none';
    pane.append(caption);
    stage.view.append(pane);
    // Zoomed in close, so the difference in sharpness is easy to see.
    views.push(stage.own(
      new EmbeddingView(pane, {
        data: { x: points.x, y: points.y, category: points.category },
        pixelRatio,
        width: w,
        height: stage.height,
        viewportState: { x: points.centres[0]![0], y: points.centres[0]![1], scale: 0.45 },
        config: { colorScheme: 'dark' },
        theme: { statusBar: false },
      }),
    ));
  });

  if (stage.preview) {
    const [cx, cy] = points.centres[0]!;
    stage.loop((_, t) => {
      for (const v of views) v.update({ viewportState: { x: cx + Math.sin(t / 2) * 0.6, y: cy, scale: 0.45 } });
    });
  }
  return stage.dispose;
};

export default mount;
