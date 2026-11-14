// opacity fades a whole layer; deck.gl applies gamma so the steps look even
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };

  const layers = (opacity: number) => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 90_000,
      getFillColor: [255, 140, 60],
      getLineColor: [255, 255, 255],
      stroked: true,
      lineWidthMinPixels: 1,
      radiusMinPixels: 3,
      opacity,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(0.8) });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => deck.setProps({ layers: layers(0.55 + Math.sin(t * 1.4) * 0.45) }));
  else slider(controlBar(el), 'opacity', 0, 1, 0.05, 0.8, (v) => deck.setProps({ layers: layers(v) }));
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
