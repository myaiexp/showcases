// A widget that drives the camera: getViewState and setViewState from its buttons
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { RotateWidget } from './rotate-widget.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 12, latitude: 47, zoom: ctx.preview ? 3 : 4, bearing: 0, pitch: 30 };
  const rotate = new RotateWidget({ placement: 'top-right', step: 45 });
  const label = ctx.preview ? null : readout(el, 'bearing 0, pitch 30');

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
        getRadius: (d) => Math.sqrt(d.population) * 20_000,
        getFillColor: [255, 140, 60, 220],
        radiusMinPixels: 4,
      }),
    ],
    widgets: [rotate],
    onViewStateChange: ({ viewState }) => {
      const v = viewState as MapViewState;
      if (label) label.textContent = `bearing ${Math.round(v.bearing ?? 0)}, pitch ${Math.round(v.pitch ?? 0)}`;
    },
  });

  // Cards have no pointer: the widget's own method turns the camera, as its buttons would.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => rotate.adjust(i++ % 6 === 5 ? 0 : 45, i % 6 === 5 ? -15 : 0), 1200);
  } else {
    slider(controlBar(el), 'step (deg)', 5, 90, 5, 45, (v) => rotate.setProps({ step: v }));
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
