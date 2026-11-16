// EditBox: flippedX, flippedY, flipped and flippedOne follow the mirroring
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Flip the selection along x and y and read the edit box flags.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  watch(stage, () => {
    const { editBox } = app.editor;
    return 'flippedX: ' + editBox.flippedX + '  flippedY: ' + editBox.flippedY + '\nflipped: ' + editBox.flipped + '  flippedOne: ' + editBox.flippedOne;
  });

  actions(
    stage,
    [
      { name: "app.editor.flip('x')", run: () => app.editor.flip('x') },
      { name: "app.editor.flip('y')", run: () => app.editor.flip('y') },
    ],
    { reset: restore, gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
