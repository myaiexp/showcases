// Film: the GIF plays inside a Polygon's shape
import { Leafer, Polygon } from 'leafer-ui';
import { PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the hexagon to pause or play.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 1.1;
  const url = blobUrl(stage, spinnerBlob());
  const polygon = new Polygon({
    ...mid(stage, S),
    width: S,
    height: S,
    sides: 6,
    fill: { type: 'film', url, mode: 'stretch' },
  });
  leafer.add(polygon);

  const film = new PaintFilm(polygon);
  polygon.on('click', () => film.togglePlay());

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
