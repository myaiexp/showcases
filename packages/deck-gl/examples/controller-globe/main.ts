// GlobeController: inertia keeps the globe spinning; maxBounds limits the view
import { Deck, _GlobeView as GlobeView } from '@deck.gl/core';
import { ScatterplotLayer, SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#05080d' });
  const info = ctx.preview ? overlay(stage.box, 'inertia: the globe keeps turning', 'bottom') : readout(el, 'Fling the globe and let go.');
  const opts = { inertia: 1500, bounded: false };
  const options = () => ({
    inertia: opts.inertia === 0 ? false : opts.inertia,
    // Looking is limited to this box of longitudes and latitudes.
    ...(opts.bounded ? { maxBounds: [[-30, 20], [60, 70]] as [[number, number], [number, number]] } : {}),
  });

  const deck = new Deck({
    device: stage.device,
    views: new GlobeView({ id: 'globe' }),
    initialViewState: { longitude: 10, latitude: 35, zoom: ctx.preview ? 0.2 : 0.9 },
    controller: ctx.preview ? false : options(),
    layers: [
      new SolidPolygonLayer<[number, number][]>({ id: 'ocean', data: [[[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]]], getPolygon: (d) => d, filled: true, getFillColor: [11, 22, 34] }),
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 3.5, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // A fling every 4 s, decaying to rest like inertia does.
    stop = animate((t) => {
      const u = t % 4;
      deck.setProps({ viewState: { longitude: wrapLng(-120 + Math.floor(t / 4) * 140 + 140 * (1 - Math.exp(-u / 0.9))), latitude: 25, zoom: 0.2 } });
    });
  } else {
    const bar = controlBar(el);
    const apply = (): void => {
      deck.setProps({ controller: options() });
      info.textContent = `inertia ${opts.inertia === 0 ? 'false' : opts.inertia}   maxBounds ${opts.bounded ? '[[-30, 20], [60, 70]]' : 'none'}`;
    };
    slider(bar, 'inertia (ms, 0 = off)', 0, 3000, 100, opts.inertia, (v) => { opts.inertia = v; apply(); });
    check(bar, 'maxBounds', false, (v) => { opts.bounded = v; apply(); });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
