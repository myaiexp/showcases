// Two views sharing one viewport: points on the left, density on the right
import { EmbeddingView, type ViewportState } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom or pan either side; the other follows.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000 });
  const half = Math.floor(stage.width / 2) - 2;

  const left = document.createElement('div');
  const right = document.createElement('div');
  left.style.cssText = `position:absolute;left:0;top:0;width:${half}px;height:100%`;
  right.style.cssText = `position:absolute;right:0;top:0;width:${half}px;height:100%`;
  stage.view.append(left, right);

  let shared: ViewportState = { x: 0, y: 0, scale: 0.08 };
  const views: EmbeddingView[] = [];
  // "You may use this to share viewport state across multiple views": each view reports its
  // changes, and the shared state is pushed back into both.
  const share = (v: ViewportState): void => {
    shared = v;
    for (const view of views) view.update({ viewportState: shared });
  };
  const data = { x: points.x, y: points.y, category: points.category };
  for (const [target, mode] of [[left, 'points'], [right, 'density']] as const) {
    views.push(
      stage.own(
        new EmbeddingView(target, {
          data,
          viewportState: shared,
          width: half,
          height: stage.height,
          config: { colorScheme: 'dark', mode },
          onViewportState: share,
        }),
      ),
    );
  }

  if (stage.preview) {
    stage.loop((_, t) => share({ x: 3 * Math.sin(t / 3), y: 2 * Math.cos(t / 4), scale: 0.1 + 0.06 * Math.sin(t / 2) ** 2 }));
  }
  return stage.dispose;
};

export default mount;
