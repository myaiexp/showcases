// Editor config: point pointType gives each corner a role
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
    pointSize: 24,
    point: [
      { pointType: 'resize' },
      { pointType: 'button', event: { tap: () => say('button tapped') }, fill: { type: 'image', url: photo() } },
      { pointType: 'rotate' },
      { pointType: 'resize-rotate' },
    ], // top-left, top-right, bottom-right, bottom-left
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
      const p = spot(rect, 1, 0);
      await ghost.tap(p.x, p.y);
      await stage.wait(1400);
    });
  }
  return stage.dispose;
};

export default mount;
