// IconLayer auto-packing: getIcon returns {url, width, height, id}
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { ICON_NAMES, iconDataUrl, type IconName } from '../../shared/core-layers-1-art.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

// No iconAtlas or iconMapping: the layer fetches each distinct id once and packs the images.
const URLS = Object.fromEntries(ICON_NAMES.map((n) => [n, iconDataUrl(n)])) as Record<IconName, string>;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.2 : 1.2 };
  const log = ctx.preview ? null : readout(el, 'Icons packed from data URLs; load errors would show here');

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new IconLayer<City>({
        id: 'icons',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getIcon: (d) => {
          const name = ICON_NAMES[d.name.length % ICON_NAMES.length]!;
          // Same id: defined once. A size differing from the first use of an id is ignored.
          return { url: URLS[name], width: 64, height: 64, id: name, anchorY: name === 'pin' ? 62 : 32 };
        },
        getSize: 30,
        onIconError: (e) => {
          if (log) log.textContent = `icon failed: ${e.error?.message ?? 'unknown'}`;
        },
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((10 + t * 8 + 180) % 360) - 180 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
