// Controller keyboard options: zoomSpeed, moveSpeed and the rotate speeds for the arrow and +/- keys
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const keys = { zoomSpeed: 2, moveSpeed: 100, rotateSpeedX: 15, rotateSpeedY: 10 };
  const home: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 3 : 4, pitch: 40 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Click the map to focus it, then use the arrow keys, shift + arrows and + / -.');
  // Key events go to the focused element, so the canvas must be focusable.
  stage.canvas.tabIndex = 0;
  stage.canvas.style.outline = 'none';
  const focus = (): void => stage.canvas.focus();
  stage.canvas.addEventListener('pointerdown', focus);

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : { keyboard: { ...keys } },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Pretend keys: arrows pan, shift + arrows rotate and tilt, + zooms.
    stop = animate((t) => {
      const phase = Math.floor(t / 2) % 3;
      const u = (t % 2) / 2;
      const view: MapViewState = { ...home };
      if (phase === 0) { view.longitude = 10 + u * 24; info.textContent = 'arrow keys: moveSpeed'; }
      else if (phase === 1) { view.bearing = u * 60; view.pitch = 40 + u * 15; info.textContent = 'shift + arrows: rotateSpeedX / Y'; }
      else { view.zoom = (home.zoom ?? 0) + u * 1.2; info.textContent = '+ / -: zoomSpeed'; }
      deck.setProps({ viewState: view });
    });
  } else {
    const bar = controlBar(el);
    const set = (patch: Partial<typeof keys>): void => {
      Object.assign(keys, patch);
      deck.setProps({ controller: { keyboard: { ...keys } } });
    };
    slider(bar, 'zoomSpeed', 0.5, 6, 0.5, keys.zoomSpeed, (v) => set({ zoomSpeed: v }));
    slider(bar, 'moveSpeed (px)', 20, 400, 20, keys.moveSpeed, (v) => set({ moveSpeed: v }));
    slider(bar, 'rotateSpeedX', 2, 45, 1, keys.rotateSpeedX, (v) => set({ rotateSpeedX: v }));
    slider(bar, 'rotateSpeedY', 2, 30, 1, keys.rotateSpeedY, (v) => set({ rotateSpeedY: v }));
  }
  return () => {
    stop();
    stage.canvas.removeEventListener('pointerdown', focus);
    stage.release(deck);
  };
};

export default mount;
