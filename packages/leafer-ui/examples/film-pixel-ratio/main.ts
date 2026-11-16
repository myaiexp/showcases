// Film: pixelRatio 1, 2 and 3 on auto-sized films
import { Leafer, Text } from 'leafer-ui';
import { Film } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No width or height is given: the size comes from the GIF.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const url = blobUrl(stage, spinnerBlob());
  const k = stage.preview ? 0.7 : 1;
  let x = stage.width / 2 - ((96 + 48 + 32 + 92) * k) / 2;
  for (const pixelRatio of [1, 2, 3]) {
    const film = new Film({ url, pixelRatio, x, y: stage.height / 2 - 48 * k }); // auto size: only then does pixelRatio apply
    film.scale = k;
    leafer.add(film);
    const w = 96 / pixelRatio;
    leafer.add(new Text({ x, y: stage.height / 2 + 56 * k, text: `pixelRatio ${pixelRatio}\n${w} px`, fontSize: 12 * k + 1, fill: '#666', textAlign: 'left' }));
    x += (w + 46) * k;
  }

  return stage.dispose;
};

export default mount;
