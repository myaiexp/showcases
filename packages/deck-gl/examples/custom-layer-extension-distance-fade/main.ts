// A LayerExtension with constructor options, extra props and a draw hook
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { CITIES, routes, type City, type Route } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { DistanceFadeExtension, type DistanceFadeOptions, type DistanceFadeProps } from './distance-fade-extension.ts';

const ROUTES = routes(['London', 'Dubai', 'New York']);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 30, zoom: ctx.preview ? 0.9 : 1.4 };
  const state = { mode: 'fade' as DistanceFadeOptions['mode'], radius: 45, center: [10, 35] as [number, number] };

  const layers = () => {
    // A new extension instance with different opts is a different extension: shaders rebuild.
    const extensions = [new DistanceFadeExtension({ mode: state.mode })];
    const fade: DistanceFadeProps = { fadeCenter: state.center, fadeRadius: state.radius };
    return [
      landLayer(),
      new ArcLayer<Route, DistanceFadeProps>({
        id: 'arcs',
        data: ROUTES,
        getSourcePosition: (d) => d.from.coordinates,
        getTargetPosition: (d) => d.to.coordinates,
        getSourceColor: [90, 200, 255],
        getTargetColor: [255, 160, 90],
        getWidth: 1,
        extensions,
        ...fade,
      }),
      new ScatterplotLayer<City, DistanceFadeProps>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: 120_000,
        radiusMinPixels: 3,
        getFillColor: [255, 255, 255],
        extensions,
        ...fade,
      }),
    ];
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.center = [20 + Math.cos(t * 0.6) * 70, 25 + Math.sin(t * 0.9) * 30];
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'mode (extension opts)', ['fade', 'cut'] as const, (v) => {
      state.mode = v;
      deck.setProps({ layers: layers() });
    });
    slider(bar, 'fadeRadius', 5, 120, 5, state.radius, (v) => {
      state.radius = v;
      deck.setProps({ layers: layers() });
    });
    readout(el, 'Both layers get the same extension; each draw() call writes the centre and radius uniforms.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
