// coordinateSystem LNGLAT_OFFSETS: positions are degrees from coordinateOrigin
import { COORDINATE_SYSTEM, Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PathLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Offset {
  /** [degrees east, degrees north, metres up] from the layer's coordinateOrigin. */
  position: [number, number, number];
}

/** A grid every 2 degrees, from -10 to +10 in both directions. */
const GRID: Offset[] = Array.from({ length: 121 }, (_, i) => ({ position: [((i % 11) - 5) * 2, (Math.floor(i / 11) - 5) * 2, 0] }));
/** A square ring 8 degrees out, as a path of offsets. */
const RING = [{ path: [[-8, -8], [8, -8], [8, 8], [-8, 8], [-8, -8]] as [number, number][] }];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.6 : 2.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const layers = (lat: number) => {
    const origin: [number, number, number] = [10, lat, 0];
    return [
      landLayer(),
      new PathLayer<(typeof RING)[number]>({
        id: 'ring',
        data: RING,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
        coordinateOrigin: origin,
        getPath: (d) => d.path,
        getColor: [120, 220, 255],
        getWidth: 2,
        widthUnits: 'pixels',
      }),
      new ScatterplotLayer<Offset>({
        id: 'grid',
        data: GRID,
        coordinateSystem: COORDINATE_SYSTEM.LNGLAT_OFFSETS,
        coordinateOrigin: origin,
        getPosition: (d) => d.position,
        getRadius: 4,
        radiusUnits: 'pixels',
        getFillColor: [255, 190, 90],
      }),
    ];
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers(40) });
  const set = (lat: number): void => {
    deck.setProps({ layers: layers(lat) });
    label.textContent = `coordinateOrigin: [10, ${lat.toFixed(0)}]; offsets are degrees, so the grid stretches toward the poles`;
  };
  set(40);

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => set(40 + Math.sin(t * 0.7) * 35));
  else slider(controlBar(el), 'origin latitude', -60, 70, 5, 40, set);
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
