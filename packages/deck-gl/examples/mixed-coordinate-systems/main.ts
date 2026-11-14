// Each layer sets its own coordinateSystem, so data from different sources composes in one view
import { COORDINATE_SYSTEM, Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

type P = { position: [number, number, number]; ring: number };

const ORIGIN: [number, number, number] = [2.3522, 48.8566, 0];
/** Metre rings around the origin, 8 points on each of three rings. */
const METRIC: P[] = [1, 2, 3].flatMap((ring) =>
  Array.from({ length: 8 * ring }, (_, i) => {
    const a = (i / (8 * ring)) * Math.PI * 2;
    return { ring, position: [Math.cos(a) * ring * 900, Math.sin(a) * ring * 900, 0] as [number, number, number] };
  }),
);
/** Degree offsets: a small grid, 0.04 degrees apart. */
const DEGREES: P[] = Array.from({ length: 25 }, (_, i) => ({ ring: 0, position: [((i % 5) - 2) * 0.04, (Math.floor(i / 5) - 2) * 0.04, 0] }));
/** Absolute longitude/latitude of some places. */
const ABSOLUTE: P[] = [[2.2945, 48.8584], [2.3376, 48.8606], [2.3499, 48.853], [2.3212, 48.8738]].map(([x, y]) => ({ ring: 0, position: [x!, y!, 0] }));

const mount: Mount = async (el, ctx) => {
// City scale: the world basemap would be one flat fill that z-fights with flat layers,
  // so the stage colour stands in for land (see the trap list in shared/stage.ts).
  const stage = await createStage(el, ctx, { background: '#1e2938' });
  const view: MapViewState = { longitude: 2.3522, latitude: 48.8566, zoom: ctx.preview ? 10.6 : 11.2 };
  const show = { metres: true, degrees: true, lnglat: true };

  const layers = () => [
    new ScatterplotLayer<P>({
      id: 'metres',
      data: METRIC,
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: ORIGIN,
      getPosition: (d) => d.position,
      getRadius: 110, // metres
      getFillColor: (d) => [255, 120 + d.ring * 40, 70, 230],
      visible: show.metres,
    }),
    new ScatterplotLayer<P>({
      id: 'degrees',
      data: DEGREES,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
      coordinateOrigin: ORIGIN,
      getPosition: (d) => d.position,
      getRadius: 5,
      radiusUnits: 'pixels',
      getFillColor: [90, 190, 255, 230],
      visible: show.degrees,
    }),
    new ScatterplotLayer<P>({
      id: 'lnglat',
      data: ABSOLUTE,
      coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      getPosition: (d) => d.position,
      getRadius: 9,
      radiusUnits: 'pixels',
      getFillColor: [255, 255, 255],
      visible: show.lnglat,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => deck.setProps({ layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    overlay(stage.box, 'METER_OFFSETS + LNGLAT_OFFSETS + LNGLAT', 'bottom');
    stop = animate((t) => {
      const step = Math.floor(t / 1.2) % 4;
      show.metres = step !== 1;
      show.degrees = step !== 2;
      show.lnglat = step !== 3;
      apply();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'METER_OFFSETS rings', true, (v) => ((show.metres = v), apply()));
    check(bar, 'LNGLAT_OFFSETS grid', true, (v) => ((show.degrees = v), apply()));
    check(bar, 'LNGLAT points', true, (v) => ((show.lnglat = v), apply()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
