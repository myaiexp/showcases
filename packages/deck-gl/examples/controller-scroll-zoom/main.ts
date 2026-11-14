// Controller scrollZoom speed and smooth: how far a wheel notch zooms, and whether it eases
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const [longitude, latitude] = city('Berlin').coordinates;
  const home: MapViewState = { longitude, latitude, zoom: ctx.preview ? 3 : 4 };
  let speed = 0.01;
  let smooth = false;
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Scroll over the map.');

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : { scrollZoom: { speed, smooth } },
    onViewStateChange: ({ viewState }) => {
      if (!ctx.preview) info.textContent = `zoom ${(viewState as MapViewState).zoom.toFixed(2)}   scrollZoom: { speed: ${speed}, smooth: ${smooth} }`;
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let timer = 0;
  if (ctx.preview) {
    // A card has no wheel: replay what a few notches look like, first jumping, then easing.
    let step = 0;
    const tick = (): void => {
      const smoothNow = Math.floor(step / 8) % 2 === 1;
      const zoom = 3 + (step % 8 < 4 ? step % 4 : 4 - (step % 4)) * 0.5;
      info.textContent = `scrollZoom: { smooth: ${smoothNow} }`;
      deck.setProps({ initialViewState: { ...home, zoom, transitionDuration: smoothNow ? 450 : 0 } });
      step++;
    };
    tick();
    timer = window.setInterval(tick, 700);
  } else {
    const bar = controlBar(el);
    const apply = (): void => deck.setProps({ controller: { scrollZoom: { speed, smooth } } });
    slider(bar, 'speed', 0.002, 0.04, 0.002, speed, (v) => { speed = v; apply(); });
    check(bar, 'smooth', false, (v) => { smooth = v; apply(); });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
