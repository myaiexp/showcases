// Editor config: circle as a custom button
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { label } from '../../shared/basics.ts';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, solo, spot } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Tap the image handle." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    circle: {
      pointType: 'button',
      width: 24,
      height: 24,
      event: { tap: () => say('button tapped') },
      fill: { type: 'image', url: photo() },
    },
  } }));
  const rect = solo(stage, g, { fill: '#FEB027', cornerRadius: 12 });
  app.tree.add(rect);
  app.editor.select(rect);
  const say = label(stage, 'tap the image button', false);
  const ghost = stage.preview ? stage.ghost(app) : null;
  if (ghost) {
    script(stage, async () => {
      say('tap the image button');
      await stage.wait(700);
      const p = spot(app.editor.editBox.circle);
      await ghost.tap(p.x, p.y);
      await stage.wait(1400);
    });
  }
  return stage.dispose;
};

export default mount;
