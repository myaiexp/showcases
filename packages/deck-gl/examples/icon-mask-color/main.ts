// IconLayer: mask true takes getColor, mask false keeps the image
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drawAtlas, ICON_NAMES } from '../../shared/core-layers-1-art.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const COLOURED = drawAtlas(false);
const MASKED = drawAtlas(true);

/** Green for small metros through red for the biggest. */
function byPopulation(d: City): Color {
  const t = Math.min(1, d.population / 30);
  return [80 + t * 175, 230 - t * 170, 110, 255];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.2 : 1.2 };

  const icons = (masked: boolean): IconLayer<City> => {
    const sheet = masked ? MASKED : COLOURED;
    return new IconLayer<City>({
      id: `icons-${masked}`,
      data: CITIES,
      iconAtlas: sheet.atlas,
      iconMapping: sheet.mapping, // each entry carries mask: true or false
      getIcon: (d) => ICON_NAMES[d.name.length % ICON_NAMES.length]!,
      getPosition: (d) => d.coordinates,
      getSize: 28,
      // With mask: the icon takes this colour. Without: only its alpha is used.
      getColor: masked ? byPopulation : [255, 255, 255, 255],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), icons(true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), icons(Math.floor(t / 2) % 2 === 0)], viewState: { ...view, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    select(controlBar(el), 'mask', ['true (getColor)', 'false (image colours)'] as const, (v) => deck.setProps({ layers: [landLayer(), icons(v.startsWith('true'))] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
