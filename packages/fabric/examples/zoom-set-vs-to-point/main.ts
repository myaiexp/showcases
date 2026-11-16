// setZoom and zoomToPoint side by side, driven by the same wheel turns
import { Canvas, type Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, sceneAt, WORLD_H, WORLD_W, wheelAt } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  // A card has room for one pane: it flips between the two methods instead.
  const stage = createStage(el, ctx, {
    panes: ctx.preview ? undefined : ['setZoom(zoom)', 'zoomToPoint(pointer, zoom)'],
    hint: 'Scroll over either pane: both zoom by the same factor. The left one anchors at its top-left corner, the right one at the pointer. A cross marks the pointer.',
  });
  const left = stage.own(new Canvas(stage.panes[0]!.el), stage.panes[0]);
  const right = stage.preview ? left : stage.own(new Canvas(stage.panes[1]!.el), stage.panes[1]);
  const canvases = stage.preview ? [left] : [left, right];
  const say = status(stage);

  const home = Math.min(stage.width / WORLD_W, stage.height / WORLD_H);
  const reset = (): void => {
    for (const c of canvases) c.setViewportTransform([home, 0, 0, home, 0, 0]);
  };
  for (const c of canvases) c.add(...buildWorld());
  reset();

  let previewMethod: 'setZoom' | 'zoomToPoint' = 'zoomToPoint';
  const zoomBoth = (point: Point, factor: number, source: Canvas): void => {
    const zoom = Math.min(20, Math.max(0.1, source.getZoom() * factor));
    if (stage.preview) {
      if (previewMethod === 'setZoom') left.setZoom(zoom);
      else left.zoomToPoint(point, zoom);
      say(`${previewMethod}: zoom ${zoom.toFixed(2)}`);
      return;
    }
    left.setZoom(zoom);
    right.zoomToPoint(point, zoom);
    say(`zoom ${zoom.toFixed(2)}: left anchors at (0, 0), right at the pointer (${Math.round(point.x)}, ${Math.round(point.y)})`);
  };

  for (const c of canvases) {
    c.on('mouse:wheel', (opt) => {
      zoomBoth(opt.viewportPoint, 0.999 ** opt.e.deltaY, c);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }
  say('scroll to zoom');

  if (stage.bar) button(stage.bar, 'Reset', reset);
  else {
    const ghost = stage.ghost(left);
    const at = { x: stage.width * 0.6, y: stage.height * 0.55 };
    stage.repeat(async () => {
      for (const method of ['zoomToPoint', 'setZoom'] as const) {
        previewMethod = method;
        left.setViewportTransform([home, 0, 0, home, 0, 0]);
        await ghost.move(sceneAt(left, at), 400);
        for (let i = 0; i < 12; i++) {
          wheelAt(ghost, left, at, -130);
          await stage.wait(90);
        }
        await stage.wait(700);
      }
    }, 100);
  }

  return stage.dispose;
};

export default mount;
