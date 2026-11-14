// InfoWidget in hover mode: a themed tooltip anchored on the hovered city
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { InfoWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4 };

  const info = new InfoWidget({
    id: 'city-info',
    mode: 'hover',
    placement: 'top',
    offset: 14,
    arrow: [14, 8],
    // Receives the picking info of whatever is under the pointer; null hides the popup.
    getTooltip: (picked: PickingInfo<City>) =>
      picked.object
        ? {
            // Anchor in world coordinates: the popup follows the city, not the mouse.
            position: picked.object.coordinates,
            html: `<b>${picked.object.name}</b><br>${picked.object.country}<br>${picked.object.population} million`,
          }
        : null,
  });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        pickable: true, // widgets get picking info only from pickable layers
        autoHighlight: true,
        highlightColor: [255, 255, 255, 255],
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 4,
      }),
    ],
    widgets: [info],
  });

  // No pointer in a card: pick the city at its projected position and hand the info to the
  // widget's onHover hook, as Deck would for a real hover.
  let stop = (): void => {};
  if (ctx.preview) {
    const names = ['Paris', 'Cairo', 'Moscow', 'Lagos', 'Istanbul', 'Madrid'];
    let last = -1;
    stop = animate((t) => {
      const i = Math.floor(t / 1.8) % names.length;
      if (i === last) return;
      const viewport = deck.getViewports()[0];
      const c = CITIES.find((x) => x.name === names[i]);
      if (!viewport || !c) return;
      const [x, y] = viewport.project(c.coordinates);
      const picked = deck.pickObject({ x: x!, y: y! });
      if (picked) {
        last = i;
        info.onHover(picked);
      }
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
