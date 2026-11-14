// A custom tooltip: onHover moves your own element to the pointer, no getTooltip
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PROBES = ['Tokyo', 'Paris', 'New York', 'Cairo', 'Lagos', 'Sydney'].map(city);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 25, zoom: ctx.preview ? 0.4 : 1.1 };

  // The element lives inside the stage box, so x and y (canvas pixels) place it directly.
  const tooltip = document.createElement('div');
  tooltip.style.cssText =
    'position:absolute;z-index:1;pointer-events:none;display:none;padding:6px 10px;border-radius:6px;background:#fff;color:#14202e;font:12px/1.3 sans-serif;box-shadow:0 2px 8px #0008;transform:translate(10px,-110%)';
  stage.box.append(tooltip);

  const updateTooltip = ({ object, x, y }: PickingInfo<City>): void => {
    if (object) {
      tooltip.style.display = 'block';
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.innerText = `${object.name} (${object.population} million)`;
    } else {
      tooltip.style.display = 'none';
    }
  };

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
        onHover: updateTooltip, // a layer-level handler: only this layer's objects
      }),
    ],
  });

  // A card has no pointer. A timer picks at a city's screen position and feeds the result
  // to the same handler, so the tooltip is driven by real picking.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const target = PROBES[i++ % PROBES.length]!;
      const at = screenOf(deck, target.coordinates);
      if (!at) return;
      const hit = deck.pickObject({ x: at[0], y: at[1], radius: 4 });
      updateTooltip({ ...(hit ?? {}), object: hit?.object as City | undefined, x: at[0], y: at[1] } as PickingInfo<City>);
    }, 1200);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
