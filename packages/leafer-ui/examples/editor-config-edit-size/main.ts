// Editor config: editSize chooses what resizing changes
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a corner handle: with size the width and height change, with scale the scaleX and scaleY do.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { editSize: 'size' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  watch(stage, () => 'width ' + r1(rect.width) + '  height ' + r1(rect.height) + '\nscaleX ' + r1(rect.scaleX as number) + '  scaleY ' + r1(rect.scaleY as number));

  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(
    stage,
    'editSize',
    ['size', 'scale'],
    (v) => (restore(), tune(app)({ editSize: v })),
    ghost
      ? async () => {
          await stage.wait(500);
          await pull(app, ghost, rect, [1, 1], [26, 20]);
          await stage.wait(1200);
        }
      : undefined,
  );
  return stage.dispose;
};

export default mount;
