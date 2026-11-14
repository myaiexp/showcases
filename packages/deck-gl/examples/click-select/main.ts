// onClick selects an object; the selection re-colours it through updateTriggers
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Click a city (click empty map to clear)');
  let selected = -1;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      // The accessor reads `selected`, which deck.gl cannot see: declare it as a trigger.
      getFillColor: (_d, { index }) => (index === selected ? [255, 240, 120] : [90, 170, 255, 200]),
      updateTriggers: { getFillColor: [selected] },
      radiusMinPixels: 4,
      pickable: true,
      onClick: (info: PickingInfo<City>) => {
        selected = info.index;
        label.textContent = info.object ? `selected #${info.index}: ${info.object.name}` : 'nothing selected';
        deck.setProps({ layers: layers() });
      },
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      selected = (selected + 3) % CITIES.length;
      label.textContent = `selected #${selected}: ${CITIES[selected]!.name}`;
      deck.setProps({ layers: layers() });
    }, 1100);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
