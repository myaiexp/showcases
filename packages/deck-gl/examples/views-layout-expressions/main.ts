// View x, y, width and height take calc() expressions: three panels with a gap you can change
import { Deck, MapView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const PANEL = [26, 40, 60, 255] as [number, number, number, number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let shared: MapViewState = { longitude: 15, latitude: 40, zoom: ctx.preview ? 0.9 : 1.6 };
  const all = (s: MapViewState) => ({ tall: s, top: { ...s, zoom: s.zoom + 1.2 }, bottom: { ...s, zoom: s.zoom - 0.8 } });
  const label = ctx.preview ? null : readout(el);

  // One tall panel on the left and two stacked on the right, all sized from `gap` pixels.
  const makeViews = (gap: number) => {
    const half = `calc(50% - ${gap * 1.5}px)`;
    const base = { clear: true, clearColor: PANEL, controller: !ctx.preview };
    if (label) label.textContent = `x: ${gap}   width: calc(60% - ${gap * 1.5}px)   height: ${half}`;
    return [
      new MapView({ id: 'tall', ...base, x: gap, y: gap, width: `calc(60% - ${gap * 1.5}px)`, height: `calc(100% - ${gap * 2}px)` }),
      new MapView({ id: 'top', ...base, x: `calc(60% + ${gap / 2}px)`, y: gap, width: `calc(40% - ${gap * 1.5}px)`, height: half }),
      new MapView({ id: 'bottom', ...base, x: `calc(60% + ${gap / 2}px)`, y: `calc(50% + ${gap / 2}px)`, width: `calc(40% - ${gap * 1.5}px)`, height: half }),
    ];
  };

  const deck = new Deck({
    device: stage.device,
    views: makeViews(10),
    viewState: all(shared),
    onViewStateChange: ({ viewId, viewState }) => {
      const next = viewState as MapViewState;
      // The panels keep their own zoom offsets; a pan in any of them moves the shared centre.
      shared = { ...shared, longitude: next.longitude, latitude: next.latitude, zoom: next.zoom - (viewId === 'top' ? 1.2 : viewId === 'bottom' ? -0.8 : 0) };
      deck.setProps({ viewState: all(shared) });
    },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 3.5, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) stop = animate((t) => deck.setProps({ views: makeViews(4 + (Math.sin(t * 1.2) + 1) * 9) }));
  else slider(controlBar(el), 'gap (px)', 0, 40, 1, 10, (g) => deck.setProps({ views: makeViews(g) }));
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
