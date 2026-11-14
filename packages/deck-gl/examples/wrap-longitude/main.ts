// wrapLongitude: lines and polygons take the short way round, split at 180
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer, PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Hop {
  from: City;
  to: City;
}
const HOPS: Hop[] = [
  ['Tokyo', 'Los Angeles'],
  ['Sydney', 'Honolulu'],
  ['Auckland', 'Anchorage'],
  ['Manila', 'Honolulu'],
].map(([a, b]) => ({ from: city(a!), to: city(b!) }));

/** A box straddling the antimeridian, written with longitudes 165 then -165. */
const BOX = [{ ring: [[165, -10], [-165, -10], [-165, 12], [165, 12], [165, -10]] as [number, number][] }];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 175, latitude: 20, zoom: ctx.preview ? 0.7 : 1.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let wrap = true;

  const layers = () => [
    landLayer(),
    new PolygonLayer<(typeof BOX)[number]>({
      id: 'box',
      data: BOX,
      getPolygon: (d) => d.ring,
      getFillColor: [120, 220, 255, 60],
      getLineColor: [120, 220, 255],
      lineWidthMinPixels: 2,
      wrapLongitude: wrap, // draw the polygon across 180 instead of around the whole world
    }),
    new LineLayer<Hop>({
      id: 'hops',
      data: HOPS,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getColor: [255, 190, 90],
      getWidth: 3,
      widthUnits: 'pixels',
      wrapLongitude: wrap, // the shortest path, split where it crosses the 180th meridian
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `wrapLongitude: ${wrap}`;
  };
  apply();

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      wrap = !wrap;
      apply();
    }, 1800);
  } else {
    check(controlBar(el), 'wrapLongitude', true, (v) => {
      wrap = v;
      apply();
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
