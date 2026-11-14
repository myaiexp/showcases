// MapView repeat: copies of the world fill the screen beyond the antimeridian
import { Deck, MapView } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  if (!ctx.preview) readout(el, 'Pan east or west at this zoom: with repeat the world continues past ±180°.');

  const makeView = (repeat: boolean) => new MapView({ id: 'map', repeat, controller: !ctx.preview });
  const deck = new Deck({
    device: stage.device,
    views: makeView(true),
    initialViewState: { longitude: 150, latitude: 25, zoom: ctx.preview ? 0.4 : 1 },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        radiusUnits: 'pixels',
        getRadius: 4,
        getFillColor: [255, 170, 70],
      }),
    ],
  });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    // The centre sweeps to the edge and back; repeat flips every few seconds.
    stop = animate((t) => deck.setProps({ viewState: { longitude: 160 + Math.sin(t * 0.5) * 18, latitude: 25, zoom: 0.4 } }));
    let on = true;
    timer = window.setInterval(() => deck.setProps({ views: makeView((on = !on)) }), 3200);
  } else {
    check(controlBar(el), 'repeat', true, (v) => deck.setProps({ views: makeView(v) }));
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
