// Editor: element is the selection's one representative
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, r1, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select one rect, then both: element is the rect itself, then a proxy that matches the edit box.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => {
    const { element } = app.editor;
    if (!element) return 'element: none';
    return 'is rect1: ' + (element === rect1) + '\nelement ' + r1(element.x) + ', ' + r1(element.y) + '  ' + r1(element.width) + ' x ' + r1(element.height);
  });

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(1200);
      await ghost.tap(spot(rect2).x, spot(rect2).y, { shiftKey: true });
      await stage.wait(1400);
      await ghost.tap(130, 180);
      await stage.wait(700);
    });
  }
  return stage.dispose;
};

export default mount;
