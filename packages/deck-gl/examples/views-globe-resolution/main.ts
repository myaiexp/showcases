// GlobeView resolution and parameters: how finely flat shapes bend, and whether back faces draw
import { Deck, _GlobeView as GlobeView } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Cull = 'back' | 'none';
/** A 90 x 60 degree rectangle over the Atlantic: flat in the data, a curved patch on the globe. */
const PATCH: [number, number][] = [[-70, 5], [20, 5], [20, 65], [-70, 65]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#05080d' });

  const makeView = (resolution: number, cullMode: Cull) =>
    // GlobeView culls back faces by default; its parameters prop overrides that.
    new GlobeView({ id: 'globe', resolution, parameters: { cullMode }, controller: !ctx.preview });

  const deck = new Deck({
    device: stage.device,
    views: makeView(ctx.preview ? 30 : 10, 'back'),
    initialViewState: { longitude: -25, latitude: 35, zoom: ctx.preview ? 0.3 : 1 },
    layers: [
      landLayer(),
      new SolidPolygonLayer<[number, number][]>({ id: 'patch', data: [PATCH], getPolygon: (d) => d, getFillColor: [255, 120, 90, 130], filled: true }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ views: makeView(Math.round(2 + (Math.sin(t * 0.7) + 1) * 14), 'back'), viewState: { longitude: -25 + Math.sin(t * 0.3) * 30, latitude: 35, zoom: 0.3 } });
    });
  } else {
    let resolution = 10;
    let cull: Cull = 'back';
    const bar = controlBar(el);
    slider(bar, 'resolution (deg)', 1, 40, 1, 10, (v) => { resolution = v; deck.setProps({ views: makeView(resolution, cull) }); });
    select(bar, 'cullMode', ['back', 'none'] as const, (v) => { cull = v; deck.setProps({ views: makeView(resolution, cull) }); }, 'back');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
