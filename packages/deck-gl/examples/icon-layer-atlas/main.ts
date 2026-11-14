// IconLayer: a pre-packed iconAtlas and iconMapping, getIcon by name
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { drawAtlas, type IconName } from '../../shared/core-layers-1-art.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Which sheet entry a city gets, by metro population (millions). */
function iconFor(c: City): IconName {
  return c.population >= 15 ? 'pin' : c.population >= 8 ? 'star' : c.population >= 4 ? 'ring' : 'arrow';
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 25, zoom: ctx.preview ? 0.2 : 1.2 };
  const { atlas, mapping } = drawAtlas();

  const icons = (angle: number, lift: number): IconLayer<City> =>
    new IconLayer<City>({
      id: 'icons',
      data: CITIES,
      iconAtlas: atlas, // one sheet with every icon
      iconMapping: mapping, // name -> {x, y, width, height, anchorX, anchorY}
      getIcon: iconFor,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 18 + Math.sqrt(d.population) * 4,
      getAngle: (d) => (iconFor(d) === 'arrow' ? angle : 0), // degrees, only the arrows turn
      getPixelOffset: [0, -lift], // screen pixels
      updateTriggers: { getAngle: angle },
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), icons(0, 0)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), icons(t * 60, 0)], viewState: { ...view, longitude: ((10 + t * 8 + 180) % 360) - 180 } }));
  } else {
    let [a, lift] = [0, 0];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), icons(a, lift)] });
    const bar = controlBar(el);
    slider(bar, 'getAngle of arrows', 0, 360, 5, a, (v) => ((a = v), refresh()));
    slider(bar, 'getPixelOffset y', 0, 40, 1, lift, (v) => ((lift = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
