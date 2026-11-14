// ArcLayer: getHeight and getTilt, with sliders and a fan of arcs
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Link {
  from: City;
  to: City;
  /** Which of the fan's arcs this is, -2..2. */
  lane: number;
}

const PAIRS: [string, string][] = [['London', 'Moscow'], ['Paris', 'Istanbul'], ['Madrid', 'Cairo']];
const links: Link[] = PAIRS.flatMap(([a, b]) =>
  [-2, -1, 0, 1, 2].map((lane) => ({ from: city(a), to: city(b), lane })),
);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 420 });
  const view: MapViewState = { longitude: 18, latitude: 44, zoom: ctx.preview ? 2 : 3.2, pitch: 50, bearing: -10 };

  // getHeight multiplies the arc's height (0 is flat); getTilt (-90..90 degrees) swings it sideways.
  const arcs = (height: number, tilt: number): ArcLayer<Link> =>
    new ArcLayer<Link>({
      id: 'fan',
      data: links,
      getSourcePosition: (d) => d.from.coordinates,
      getTargetPosition: (d) => d.to.coordinates,
      getSourceColor: [255, 200, 80],
      getTargetColor: [80, 200, 255],
      getWidth: 3,
      getHeight: height,
      getTilt: (d) => d.lane * tilt,
      updateTriggers: { getTilt: tilt },
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), arcs(1, ctx.preview ? 30 : 20)],
  });

  let height = 1;
  let tilt = 20;
  const refresh = (): void => deck.setProps({ layers: [landLayer(), arcs(height, tilt)] });
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'getHeight', 0, 3, 0.1, height, (v) => ((height = v), refresh()));
    slider(bar, 'tilt per lane (deg)', 0, 45, 1, tilt, (v) => ((tilt = v), refresh()));
  }

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ layers: [landLayer(), arcs(1 + Math.sin(t) * 0.8, 15 + Math.sin(t * 0.7) * 15)] }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
