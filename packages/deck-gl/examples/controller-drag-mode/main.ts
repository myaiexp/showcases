// Controller dragMode: a plain drag pans or rotates, the other needs shift or ctrl
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const home: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 2.6 : 3.6, pitch: 40 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'dragMode: pan (drag pans; shift or ctrl + drag rotates)');

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    controller: ctx.preview ? false : { dragMode: 'pan' },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const rotate = Math.floor(t / 3) % 2 === 1;
      const u = t * 1.6;
      info.textContent = rotate ? "dragMode: 'rotate'" : "dragMode: 'pan'";
      deck.setProps({
        viewState: rotate
          ? { ...home, bearing: Math.sin(u) * 50, pitch: 40 + Math.cos(u) * 15 }
          : { ...home, longitude: wrapLng(10 + Math.sin(u) * 25), latitude: 45 + Math.cos(u) * 8 },
      });
    });
  } else {
    select(controlBar(el), 'dragMode', ['pan', 'rotate'] as const, (mode) => {
      deck.setProps({ controller: { dragMode: mode } });
      info.textContent = `dragMode: ${mode} (${mode === 'pan' ? 'drag pans; shift or ctrl + drag rotates' : 'drag rotates; shift or ctrl + drag pans'})`;
    }, 'pan');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
