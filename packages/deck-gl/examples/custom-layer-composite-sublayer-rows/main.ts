// getSubLayerRow and getSubLayerAccessor: a composite expands each object into rows but keeps its API
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, seeded, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { PingRingLayer } from './ping-ring-layer.ts';

const rand = seeded(11);
interface Station {
  city: City;
  /** Ages of recent pings, 0 (now) to 1 (oldest). */
  pings: number[];
}
const STATIONS: Station[] = CITIES.filter((c) => c.population >= 5).map((city) => ({
  city,
  pings: Array.from({ length: 2 + Math.floor(rand() * 5) }, () => rand()).sort(),
}));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { radius: 500_000 };
  const label = ctx.preview ? null : readout(el, 'Hover a ring: the accessors and the picked object are the Station, not the ring row');

  const layers = (): [ReturnType<typeof landLayer>, PingRingLayer<Station>] => [
    landLayer(),
    new PingRingLayer<Station>({
      id: 'pings',
      data: STATIONS,
      // Both accessors receive the Station, although the sublayer's rows are rings.
      getPosition: (s) => s.city.coordinates,
      getPings: (s) => s.pings,
      getRingColor: (s) => [90 + s.pings.length * 24, 200 - s.pings.length * 14, 255, 90],
      maxRadius: state.radius,
      pickable: true,
      onHover: (info: PickingInfo<Station>) => {
        if (label) label.textContent = info.object ? `${info.object.city.name}: ${info.object.pings.length} pings (index ${info.index})` : 'Hover a ring';
      },
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 5) } });
      state.radius = 300_000 + 250_000 * Math.sin(t);
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'maxRadius', 100_000, 1_000_000, 50_000, state.radius, (v) => {
      state.radius = v;
      deck.setProps({ layers: layers() });
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
