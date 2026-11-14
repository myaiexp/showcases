// useDevicePixels: true, false or a ratio, with the resulting drawing-buffer size
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const CHOICES = { true: true, false: false, '0.5': 0.5, '2': 2 } as const;
type Choice = keyof typeof CHOICES;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 1.5 };
  const label = ctx.preview ? null : readout(el);
  let choice: Choice = ctx.preview ? 'false' : 'true';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    useDevicePixels: CHOICES[choice],
    onAfterRender: () => {
      if (label) {
        const c = stage.canvas;
        label.textContent = `useDevicePixels: ${choice}   CSS ${c.clientWidth} x ${c.clientHeight}   drawing buffer ${c.width} x ${c.height}   devicePixelRatio ${window.devicePixelRatio}`;
      }
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, getRadius: 7, radiusUnits: 'pixels', getFillColor: [255, 170, 70], stroked: true, getLineColor: [255, 255, 255], lineWidthMinPixels: 1 }),
    ],
  });

  let timer = 0;
  if (ctx.preview) {
    const order: Choice[] = ['false', '0.5', '2', 'true'];
    let i = 0;
    timer = window.setInterval(() => {
      choice = order[++i % order.length]!;
      deck.setProps({ useDevicePixels: CHOICES[choice] });
    }, 1800);
  } else {
    select(controlBar(el), 'useDevicePixels', Object.keys(CHOICES) as Choice[], (v) => {
      choice = v;
      deck.setProps({ useDevicePixels: CHOICES[v] });
    }, choice);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
