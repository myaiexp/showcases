// getTooltip returning a string: Deck renders the default tooltip over the canvas
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const tip = (index: number): string => {
    const c = CITIES[index]!;
    return `${c.name}, ${c.country}`;
  };
  // A card has no pointer, so it stands in for the tooltip with a label that follows the highlight.
  const fake = ctx.preview ? overlay(stage.box, '', 'bottom') : null;

  const layer = (highlighted: number | null) =>
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [255, 150, 70, 220],
      radiusMinPixels: 4,
      pickable: true, // picking is off by default; getTooltip needs it
      autoHighlight: true,
      highlightColor: [255, 255, 255, 255],
      ...(highlighted === null ? {} : { highlightedObjectIndex: highlighted }),
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer(null)],
    // The picking info of the hovered object; return null or a falsy value to hide the tooltip.
    getTooltip: ({ object }: PickingInfo<City>) => (object ? `${object.name}, ${object.country}\n${object.population} million people` : null),
  });

  const stop = fake
    ? animate((t) => {
        const index = Math.floor(t / 1.6) % CITIES.length;
        deck.setProps({ layers: [landLayer(), layer(index)] });
        fake.textContent = `tooltip: ${tip(index)}`;
      })
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
