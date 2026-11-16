// Interaction: locked true on an editable element
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Lock the rect, then try to select and move it." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const s = Math.round(Math.min(stage.width, stage.height) * 0.35);
  const home = { x: Math.round(stage.width * 0.2), y: Math.round((stage.height - s) / 2 - 8) };
  const rect = new Rect({ ...home, width: s, height: s, fill: '#32cd79', cornerRadius: 12, editable: true, name: 'rect' });
  app.tree.add(rect);
  const say = label(stage, '', true);
  const apply = (on: boolean): void => {
    rect.locked = on;
    if (on) app.editor.cancel();
  };
  stage.loop(() => say('locked = ' + rect.locked + '\nselected: ' + (app.editor.list.length ? 'rect' : '(none)')));
  apply(false);
  if (stage.bar) checkbox(stage.bar, 'locked', false, apply);
  else {
    const ghost = stage.ghost(app);
    const c = { x: home.x + s / 2, y: home.y + s / 2 };
    tour(stage, [true, false], async (on) => {
      apply(on);
      rect.set(home);
      await stage.wait(400);
      await ghost.drag(c, { x: c.x + stage.width * 0.35, y: c.y }, 700);
      await stage.wait(1100);
    });
  }

  return stage.dispose;
};

export default mount;
