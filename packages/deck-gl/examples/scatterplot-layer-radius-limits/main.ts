// ScatterplotLayer radiusMinPixels and radiusMaxPixels clamp meter-sized circles as you zoom
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3.5 : 4.5 };
  const data = pointCloud(ctx.preview ? 150 : 400, { seed: 4 });
  const state = { min: 0, max: 20, zoom: 0 };

  const build = (): ScatterplotLayer<SamplePoint> =>
    new ScatterplotLayer<SamplePoint>({
      id: 'cloud',
      data,
      getPosition: (d) => d.position,
      // Real distances: 6 km circles are specks when zoomed out and huge when zoomed in.
      getRadius: 6000,
      radiusMinPixels: state.min,
      radiusMaxPixels: state.max,
      getFillColor: (d) => [90 + d.value * 160, 200 - d.value * 80, 255 - d.value * 160, 170],
    });
  const update = (): void => deck.setProps({ layers: [landLayer(), build()] });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [landLayer(), build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    state.min = 3;
    state.max = 14;
    stop = animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, zoom: 3.8 + Math.sin(t * 0.8) * 1.6 } }));
    update();
  } else {
    const bar = controlBar(el);
    slider(bar, 'radiusMinPixels', 0, 20, 1, 0, (v) => { state.min = v; update(); });
    slider(bar, 'radiusMaxPixels', 2, 60, 1, 20, (v) => { state.max = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
