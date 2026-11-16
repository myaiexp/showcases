// Film: the docs' App form with editable: true
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // optional: wheel zoom and pan
import { Film } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the film to select it (and toggle play); drag it or pull a handle.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const S = size(stage) * 0.8;
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S, editable: true });
  app.tree.add(film);
  film.on('click', () => film.togglePlay());

  if (stage.preview) {
    const ghost = stage.ghost(app);
    const c = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      film.set({ ...mid(stage, S), width: S, height: S });
      await stage.wait(1200);
      await ghost.tap(c.x, c.y);
      await stage.wait(500);
      await ghost.drag(c, { x: c.x - 40, y: c.y + 10 }, 700);
      await stage.wait(900);
      await ghost.tap(c.x - 40, c.y + 10);
      await stage.wait(800);
      await ghost.tap(10, 10);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
