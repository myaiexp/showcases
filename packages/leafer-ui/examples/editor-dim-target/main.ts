// Editor: dimTarget limits where dimOthers fades
import { App, Group, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/bright';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click a rect in either group." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { dimOthers: true } }));
  const a = pair(g);
  const left = new Group({ name: 'left', children: [a[0], new Rect({ editable: true, fill: '#32cd79', cornerRadius: 30, x: g.a.x + 20, y: g.a.y + g.size * 1.15, width: g.size * 0.8, height: g.size * 0.6 })] });
  const right = new Group({ name: 'right', children: [a[1]] });
  app.tree.addMany(left, right);
  app.editor.dimTarget = left; // only this group's other elements are dimmed
  watch(stage, () => 'dimTarget: ' + (app.editor.dimTarget as Group).name + '\ntargetLeafer is tree: ' + (app.editor.targetLeafer === app.tree));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a[0]).x, spot(a[0]).y);
      await stage.wait(1300);
      await ghost.tap(spot(a[1]).x, spot(a[1]).y);
      await stage.wait(1300);
    });
  }
  return stage.dispose;
};

export default mount;
