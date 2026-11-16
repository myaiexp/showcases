// EditBox: dragPoint and enterPoint name the control point in use
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, solo, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover and drag the handles: enterPoint follows the pointer, dragPoint is the one being dragged.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const home = { x: rect.x, y: rect.y, width: g.size, height: g.size };
  const name = (p?: { direction: number; pointType: string }): string => (p ? 'direction ' + p.direction + ' (' + p.pointType + ')' : 'none');
  watch(stage, () => {
    const { editBox } = app.editor;
    return 'enterPoint: ' + name(editBox.enterPoint) + '\ndragPoint: ' + name(editBox.dragPoint);
  });

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      rect.set(home);
      await stage.wait(500);
      const br = spot(rect, 1, 1);
      await ghost.glide(br.x, br.y, 500);
      await stage.wait(700);
      await ghost.drag(br, { x: br.x + 20, y: br.y + 15 }, 900);
      await stage.wait(500);
      const top = spot(rect, 0.5, 0);
      await ghost.glide(top.x, top.y, 600);
      await stage.wait(500);
      await ghost.drag(top, { x: top.x, y: top.y - 14 }, 800);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
