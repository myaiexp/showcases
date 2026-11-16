// Editor config: beforeScale limits the minimum size
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Shrink the rect with a corner handle (and pull past the opposite corner to flip)." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { lockRatio: true } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'width ' + r1(rect.width) + '  scaleX ' + r1(rect.scaleX as number));
  const min = (flip: boolean) => ({ target, scaleX, scaleY }: { target: { width: number; height: number }; scaleX: number; scaleY: number }) => {
    const sx = flip ? Math.abs(scaleX) : scaleX;
    const sy = flip ? Math.abs(scaleY) : scaleY;
    if (target.width * sx < 20 || target.height * sy < 20) {
      const scale = Math.min(20 / target.width, 20 / target.height);
      return flip ? { scaleX: scaleX < 0 ? -scale : scale, scaleY: scaleY < 0 ? -scale : scale } : { scaleX: scale, scaleY: scale };
    }
    return true;
  };
  variants(stage, 'beforeScale', ['min size', 'min size + flip'], (v) => (restore(), tune(app)({ beforeScale: min(v === 'min size + flip') })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 1], [-g.size - 20, -g.size - 20], undefined, 1200);
    await stage.wait(1000);
  } : undefined);
  return stage.dispose;
};

export default mount;
