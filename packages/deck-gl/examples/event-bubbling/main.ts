// A layer's onHover runs first; a truthy return skips the Deck's onHover
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };
  const label = ctx.preview
    ? overlay(stage.box, 'layer onHover returns true: the Deck handler never sees the event', 'bottom')
    : readout(el, 'Hover the cities and the empty map');
  let handled = true;
  let layerCalls = 0;
  let deckCalls = 0;
  const report = (): void => {
    if (!ctx.preview) label.textContent = `layer onHover: ${layerCalls}, Deck onHover: ${deckCalls}`;
  };

  const layer = (highlighted: number | null) =>
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 60_000,
      getFillColor: [255, 150, 70, 220],
      radiusMinPixels: 4,
      pickable: true,
      autoHighlight: true,
      ...(highlighted === null ? {} : { highlightedObjectIndex: highlighted }),
      onHover: (info: PickingInfo<City>) => {
        if (info.picked) layerCalls += 1;
        report();
        return handled; // truthy: marked as handled, does not bubble to the Deck
      },
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), layer(null)],
    onHover: (info: PickingInfo) => {
      if (info.picked) deckCalls += 1;
      report();
    },
  });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => deck.setProps({ layers: [landLayer(), layer(Math.floor(t * 1.5) % CITIES.length)] }));
  else {
    check(controlBar(el), "layer onHover returns true", true, (v) => {
      handled = v;
      deck.setProps({ layers: [landLayer(), layer(null)] });
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
