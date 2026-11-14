// ArcLayer: greatCircle takes the shortest path; numSegments smooths it
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Leg {
  from: City;
  to: City;
}

const legs: Leg[] = [
  ['Tokyo', 'Los Angeles'],
  ['London', 'Auckland'],
  ['Sydney', 'Santiago'],
  ['Moscow', 'Honolulu'],
  ['New York', 'Singapore'],
].map(([a, b]) => ({ from: city(a!), to: city(b!) }));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 20, zoom: ctx.preview ? 0 : 0.8 };

  const arcs = (greatCircle: boolean, numSegments: number): ArcLayer<Leg> =>
    new ArcLayer<Leg>({
      id: 'legs',
      data: legs,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 190, 70],
      getTargetColor: [90, 210, 255],
      getWidth: 2.5,
      getHeight: 0, // flat, so the path itself is what you compare
      greatCircle,
      numSegments,
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), arcs(true, 50)],
  });

  let great = true;
  let segments = 50;
  const refresh = (): void => deck.setProps({ layers: [landLayer(), arcs(great, segments)] });
  if (!ctx.preview) {
    const bar = controlBar(el);
    check(bar, 'greatCircle', great, (v) => ((great = v), refresh()));
    slider(bar, 'numSegments', 2, 100, 1, segments, (v) => ((segments = v), refresh()));
  }

  // Card: flip between the straight and the great-circle path.
  const timer = ctx.preview
    ? setInterval(() => {
        great = !great;
        refresh();
      }, 1800)
    : 0;
  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, longitude: ((20 + t * 6 + 180) % 360) - 180 } })) : () => {};
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
