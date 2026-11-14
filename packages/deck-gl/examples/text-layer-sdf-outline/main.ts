// TextLayer fontSettings sdf: sharp scaling text, outlineWidth and outlineColor
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 15, latitude: 42, zoom: ctx.preview ? 1.8 : 2.6 };
  const data = CITIES.filter((c) => c.population >= 11);
  const state = { sdf: true, outlineWidth: 0.25, cutoff: 0.25, size: 18 };

  const layers = (): [ReturnType<typeof landLayer>, TextLayer<City>] => [
    landLayer(),
    new TextLayer<City>({
      // The atlas depends on fontSettings, so it gets a new id when sdf or cutoff changes.
      id: `names-${state.sdf}-${state.cutoff}`,
      data,
      getText: (d) => d.name,
      getPosition: (d) => d.coordinates,
      getSize: state.size,
      getColor: [255, 240, 200],
      characterSet: 'auto',
      fontWeight: 'bold',
      // Signed distance fields keep edges sharp at any size and make an outline possible.
      fontSettings: { sdf: state.sdf, fontSize: 64, buffer: 8, radius: 12, cutoff: state.cutoff, smoothing: 0.1 },
      // Relative to the font size; only effective when sdf is true.
      outlineWidth: state.outlineWidth,
      outlineColor: [200, 40, 90, 255],
    }),
  ];
  const update = (): void => deck.setProps({ layers: layers() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.outlineWidth = 0.4 * (0.5 + 0.5 * Math.sin(t * 1.4));
      update();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'fontSettings.sdf', true, (v) => { state.sdf = v; update(); });
    slider(bar, 'outlineWidth', 0, 0.6, 0.02, 0.25, (v) => { state.outlineWidth = v; update(); });
    slider(bar, 'cutoff', 0.05, 0.6, 0.05, 0.25, (v) => { state.cutoff = v; update(); });
    slider(bar, 'getSize', 8, 48, 1, 18, (v) => { state.size = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
