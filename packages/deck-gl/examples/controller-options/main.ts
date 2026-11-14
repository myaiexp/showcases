// Controller options on and off: scrollZoom, dragPan, dragRotate, doubleClickZoom, touchZoom, keyboard
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const OPTIONS = ['scrollZoom', 'dragPan', 'dragRotate', 'doubleClickZoom', 'touchZoom', 'keyboard'] as const;
type Options = Record<(typeof OPTIONS)[number], boolean>;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const on: Options = { scrollZoom: true, dragPan: true, dragRotate: true, doubleClickZoom: true, touchZoom: true, keyboard: true };
  const home: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 2.4 : 3.4, pitch: 30 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const describe = (): string => `controller: ${JSON.stringify(on)}`;

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : { ...on },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Each phase shows the one motion that its option permits: pan, then rotate, then zoom.
    stop = animate((t) => {
      const phase = Math.floor(t / 2.5) % 3;
      const u = (t % 2.5) / 2.5;
      const view: MapViewState = { ...home };
      if (phase === 0) { view.longitude = 10 + Math.sin(u * Math.PI * 2) * 20; info.textContent = 'dragPan'; }
      else if (phase === 1) { view.bearing = Math.sin(u * Math.PI * 2) * 40; view.pitch = 30 + Math.cos(u * Math.PI * 2) * 15; info.textContent = 'dragRotate'; }
      else { view.zoom = (home.zoom ?? 0) + Math.sin(u * Math.PI * 2) * 0.8; info.textContent = 'scrollZoom'; }
      deck.setProps({ viewState: view });
    });
  } else {
    const bar = controlBar(el);
    for (const name of OPTIONS) check(bar, name, true, (v) => { on[name] = v; deck.setProps({ controller: { ...on } }); info.textContent = describe(); });
    info.textContent = describe();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
