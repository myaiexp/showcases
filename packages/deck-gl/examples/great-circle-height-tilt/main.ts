// GreatCircleLayer: getHeight, getTilt and numSegments shape the arc, pitched
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GreatCircleLayer } from '@deck.gl/geo-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Leg {
  from: City;
  to: City;
}

const legs: Leg[] = [
  ['London', 'Dubai'],
  ['Dubai', 'Singapore'],
  ['London', 'Cairo'],
  ['Paris', 'Mumbai'],
  ['Istanbul', 'Delhi'],
  ['Moscow', 'Dubai'],
].map(([a, b]) => ({ from: city(a!), to: city(b!) }));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 55, latitude: 30, zoom: ctx.preview ? 1.6 : 2.4, pitch: 50, bearing: 0 };

  let height = 1;
  let tilt = 0;
  let numSegments = 40;
  const arcs = (): GreatCircleLayer<Leg> =>
    new GreatCircleLayer<Leg>({
      id: 'legs',
      data: legs,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 190, 70],
      getTargetColor: [90, 210, 255],
      getWidth: 3,
      // Height multiplies the arc's lift (0 is flat); tilt is in degrees, -90 to 90.
      getHeight: height,
      getTilt: tilt,
      numSegments,
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), arcs()] });

  const refresh = (): void => deck.setProps({ layers: [landLayer(), arcs()] });
  const stop = ctx.preview
    ? animate((t) => {
        height = 0.2 + (1 + Math.sin(t)) * 0.6;
        tilt = Math.sin(t * 0.7) * 50;
        deck.setProps({ layers: [landLayer(), arcs()] });
      })
    : () => {};
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'getHeight', 0, 2, 0.1, height, (v) => ((height = v), refresh()));
    slider(bar, 'getTilt', -90, 90, 5, tilt, (v) => ((tilt = v), refresh()));
    slider(bar, 'numSegments', 2, 100, 2, numSegments, (v) => ((numSegments = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
