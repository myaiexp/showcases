// buildViewsFromViewLayout: an overlay layout (map plus corner minimap) compiled to views
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { buildViewsFromViewLayout } from '@deck.gl/widgets';
import type { ViewLayout } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const info = ctx.preview ? null : readout(el);

  // A plain layout tree: 'main' fills the canvas and 'minimap' floats over its top-right corner.
  const layout = {
    type: 'overlay',
    children: [
      new MapView({ id: 'main', controller: !ctx.preview }),
      new MapView({
        id: 'minimap',
        x: 'calc(100% - 148px)',
        y: 12,
        width: 136,
        height: ctx.preview ? 90 : 96,
        controller: false,
        clear: true,
      }),
    ],
  } satisfies ViewLayout;

  const compile = () => buildViewsFromViewLayout({ layout, width: stage.box.clientWidth, height: stage.box.clientHeight });
  let compiled = compile();
  const describe = (): void => {
    if (!info) return;
    const r = compiled.rectsById;
    info.textContent = Object.entries(r).map(([id, v]) => `${id}: ${Math.round(v.x)},${Math.round(v.y)} ${Math.round(v.width)}x${Math.round(v.height)}`).join('\n');
  };

  const main: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.8 : 3 };
  const mini: MapViewState = { longitude: 10, latitude: 20, zoom: -0.5 };
  const deck = new Deck({
    device: stage.device,
    views: compiled.views,
    initialViewState: { main, minimap: mini },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 2,
      }),
    ],
  });
  describe();

  // The layout depends on the canvas size: compile again when the box resizes, reusing views.
  const observer = new ResizeObserver(() => {
    compiled = buildViewsFromViewLayout({ layout, width: stage.box.clientWidth, height: stage.box.clientHeight, previous: compiled });
    deck.setProps({ views: compiled.views });
    describe();
  });
  observer.observe(stage.box);

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { main: drift(main, t), minimap: mini } })) : () => {};
  return () => {
    observer.disconnect();
    stop();
    stage.release(deck);
  };
};

export default mount;
