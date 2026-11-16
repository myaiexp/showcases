// Interaction: lockRatio on an editable element
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';
import { tour } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect and drag its right-hand handle with lockRatio on and off." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const f = stage.preview ? 1 : 1.6;
  const start = { x: Math.round(stage.width * 0.22), y: Math.round(stage.height * 0.3), width: 80 * f, height: 50 * f };
  const rect = new Rect({ ...start, fill: '#FEB027', cornerRadius: 10, editable: true, lockRatio: true });
  app.tree.add(rect);
  const say = label(stage, '', true);
  stage.loop(() => say('lockRatio = ' + rect.lockRatio + '\n' + Math.round(rect.width!) + ' x ' + Math.round(rect.height!) + '   ratio ' + (rect.width! / rect.height!).toFixed(2)));
  const apply = (on: boolean): void => void (rect.lockRatio = on);
  if (stage.bar) checkbox(stage.bar, 'lockRatio', true, apply);
  else {
    const ghost = stage.ghost(app);
    tour(stage, [true, false], async (on) => {
      apply(on);
      rect.set(start);
      app.editor.cancel();
      await stage.wait(400);
      await ghost.tap(start.x + 15, start.y + 15);
      await stage.wait(400);
      const handle = { x: start.x + start.width, y: start.y + start.height / 2 };
      await ghost.drag(handle, { x: handle.x + 50, y: handle.y }, 800);
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
