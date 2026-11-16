// Film: a Rect with a film fill, controlled through PaintFilm
import { Leafer, Rect } from 'leafer-ui';
import { PaintFilm } from '@leafer-in/film'; // Film plugin: the Film element and PaintFilm
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the rounded rect to pause or play.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const rect = new Rect({
    ...mid(stage, S),
    width: S,
    height: S,
    cornerRadius: S / 5,
    fill: { type: 'film', url, mode: 'stretch' },
  });
  leafer.add(rect);

  const film = new PaintFilm(rect); // takes the film out of the rect's fill
  rect.on('click', () => film.togglePlay());

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await stage.wait(1600);
      await ghost.tap(stage.width / 2, stage.height / 2);
      await stage.wait(1000);
      await ghost.tap(stage.width / 2, stage.height / 2);
    });
  }

  return stage.dispose;
};

export default mount;
