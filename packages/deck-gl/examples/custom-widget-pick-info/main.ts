// onHover and onClick: a custom widget that reports the picked object and pins the clicked one
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { PickInfoWidget } from './pick-info-widget.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 30, zoom: ctx.preview ? 1.2 : 1.8 };
  const widget = new PickInfoWidget({
    describe: (o) => {
      const c = o as City;
      return `${c.name}, ${c.country} (${c.population}M)`;
    },
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
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 50_000,
        getFillColor: [255, 140, 60, 220],
        radiusMinPixels: 5,
        pickable: true,
        autoHighlight: true,
      }),
    ],
    widgets: [widget],
  });

  // Cards have no pointer: probe a city at a time and hand the picking info to the widget.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const big = CITIES.filter((c) => c.population >= 10);
      const at = screenOf(deck, big[i++ % big.length]!.coordinates);
      const hit = at && deck.pickObject({ x: at[0], y: at[1] });
      if (hit) widget.showHover(hit as PickingInfo);
    }, 1300);
  } else {
    readout(el, 'Hover a city, click one to pin it. The widget receives the same picking info as onHover.');
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
