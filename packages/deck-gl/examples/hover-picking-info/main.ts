// The PickingInfo object handed to onHover: picked, index, layer, sourceLayer, x, y, coordinate
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PROBES = ['Tokyo', 'London', 'Lima', 'Cairo', 'Mumbai'].map(city);

/** The fields of the picking info as lines of text. */
function describe(info: PickingInfo<City>): string {
  const coordinate = info.coordinate?.map((v) => v.toFixed(2)).join(', ') ?? 'n/a';
  return [
    `picked: ${info.picked}`,
    `index: ${info.index}`,
    `layer: ${info.layer?.id ?? 'none'} (sourceLayer ${info.sourceLayer?.id ?? 'none'})`,
    `x, y: ${info.x}, ${info.y}`,
    `coordinate: ${coordinate}`,
    `object: ${info.object ? `${info.object.name}, ${info.object.population} million` : 'none'}`,
  ].join('\n');
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover a city');
  if (!ctx.preview) label.style.textAlign = 'left';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 60_000,
        getFillColor: [255, 150, 70, 220],
        radiusMinPixels: 4,
        pickable: true,
        autoHighlight: true,
      }),
    ],
    // Called when the hovered object changes; `info.picked` is false over empty map.
    onHover: (info: PickingInfo<City>) => {
      label.textContent = describe(info);
    },
  });

  // In a card a timer asks the picking engine about a city's pixel instead of waiting for a pointer.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const at = screenOf(deck, PROBES[i++ % PROBES.length]!.coordinates);
      const hit = at && deck.pickObject({ x: at[0], y: at[1], radius: 4 });
      if (hit) label.textContent = describe(hit as PickingInfo<City>);
    }, 1500);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
