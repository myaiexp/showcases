// highlightColor as a function of picking info: each object picks its colour
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Big cities glow red, small ones cyan. */
const colorFor = (c: City): number[] => (c.population >= 15 ? [255, 70, 70, 255] : c.population >= 6 ? [255, 210, 80, 255] : [80, 230, 240, 255]);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  if (ctx.preview) overlay(stage.box, 'highlight colour depends on population', 'bottom');
  else readout(el, 'Hover a city: red over 15 million, yellow over 6 million, else cyan');

  const layer = (highlighted: number | null) =>
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [90, 120, 170, 200],
      radiusMinPixels: 5,
      pickable: true,
      autoHighlight: true,
      // Called with the picking info when the hovered object changes (needs autoHighlight).
      // A card cannot hover, so it sets the index and the resulting colour for that city.
      highlightColor: highlighted === null ? (info: PickingInfo<City>) => (info.object ? colorFor(info.object) : [255, 255, 255, 255]) : colorFor(CITIES[highlighted]!),
      ...(highlighted === null ? {} : { highlightedObjectIndex: highlighted }),
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), layer(null)] });
  const stop = ctx.preview
    ? animate((t) => deck.setProps({ layers: [landLayer(), layer(Math.floor(t / 0.8) % CITIES.length)] }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
