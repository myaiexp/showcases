// Deck's layerFilter decides which layers draw in which view
import { Deck, MapView } from '@deck.gl/core';
import type { Layer, MapViewState } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let shared: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 0.9 : 1.9 };
  const both = (s: MapViewState) => ({ left: s, right: s });
  // Layer id -> the view that may draw it; layers that are not listed draw everywhere.
  const only: Record<string, string> = { names: 'left', bubbles: 'right' };
  const filter = ({ layer, viewport }: { layer: Layer; viewport: { id: string } }): boolean => {
    const target = only[layer.id];
    return target === undefined || target === viewport.id;
  };

  const deck = new Deck({
    device: stage.device,
    views: [
      new MapView({ id: 'left', x: 0, width: 'calc(50% - 1px)', controller: !ctx.preview }),
      new MapView({ id: 'right', x: 'calc(50% + 1px)', width: 'calc(50% - 1px)', controller: !ctx.preview }),
    ],
    viewState: both(shared),
    onViewStateChange: ({ viewState: next }) => {
      shared = next as MapViewState;
      deck.setProps({ viewState: both(shared) });
    },
    layerFilter: filter,
    layers: [
      landLayer(),
      new TextLayer<City>({
        id: 'names',
        data: CITIES.filter((c) => c.population >= (ctx.preview ? 15 : 9)),
        getPosition: (d) => d.coordinates,
        getText: (d) => d.name,
        getSize: ctx.preview ? 11 : 13,
        getColor: [235, 240, 250],
        outlineWidth: 2,
        outlineColor: [11, 22, 34, 255],
        fontSettings: { sdf: true },
        // Billboard text sinks into the flat ground at a high pitch; it is flat here, but be safe.
        parameters: { depthCompare: 'always' },
      }),
      new ScatterplotLayer<City>({
        id: 'bubbles',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => d.population * 30_000,
        radiusMinPixels: 2,
        getFillColor: [255, 150, 60, 190],
      }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: both({ ...shared, longitude: wrapLng(10 + t * 10) }) }));
  } else {
    const bar = controlBar(el);
    const set = (id: string, view: string, on: boolean): void => {
      if (on) only[id] = view;
      else delete only[id];
      // A new function is a new prop value, so deck redraws with the changed filter.
      deck.setProps({ layerFilter: (info) => filter(info) });
    };
    check(bar, 'city names only in the left view', true, (v) => set('names', 'left', v));
    check(bar, 'bubbles only in the right view', true, (v) => set('bubbles', 'right', v));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
