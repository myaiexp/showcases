// A controller per view: left map only zooms, right only pans, one view state
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let shared: MapViewState = { longitude: 15, latitude: 40, zoom: ctx.preview ? 0.9 : 1.8 };
  const both = (s: MapViewState) => ({ zoomer: s, panner: s });
  if (!ctx.preview) readout(el, 'Left: scroll zooms, drag does nothing. Right: drag pans, scroll does nothing.');

  const deck = new Deck({
    device: stage.device,
    views: [
      // Controller options are merged over the defaults for this view only.
      new MapView({ id: 'zoomer', x: 0, width: 'calc(50% - 1px)', controller: ctx.preview ? false : { dragPan: false, dragRotate: false, doubleClickZoom: false } }),
      new MapView({ id: 'panner', x: 'calc(50% + 1px)', width: 'calc(50% - 1px)', controller: ctx.preview ? false : { scrollZoom: false, doubleClickZoom: false, touchZoom: false, keyboard: false } }),
    ],
    viewState: both(shared),
    onViewStateChange: ({ viewState }) => {
      shared = viewState as MapViewState;
      deck.setProps({ viewState: both(shared) });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: both({ longitude: wrapLng(15 + t * 8), latitude: 40, zoom: 0.9 + Math.sin(t) * 0.5 }) }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
