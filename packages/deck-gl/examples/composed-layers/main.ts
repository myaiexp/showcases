// Several layers in one Deck, drawn in array order, with nested arrays and falsy
import { Deck } from '@deck.gl/core';
import type { LayersList, MapViewState } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { city, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const HUB = city('London');
const SPOKES = ['New York', 'Cairo', 'Dubai', 'Mumbai', 'Lagos', 'Moscow', 'Madrid', 'Istanbul', 'Toronto'].map(city);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 35, zoom: ctx.preview ? 0.5 : 1.3 };
  const show = { arcs: true, dots: true, labels: true };

  // `layers` accepts nested arrays and falsy values, so a flag can switch a group off
  // inline. Layers draw in order: later entries paint over earlier ones.
  const layers = (): LayersList => [
    landLayer(),
    show.arcs && [
      new ArcLayer<City>({
        id: 'spokes',
        data: SPOKES,
        getSourcePosition: () => HUB.coordinates,
        getTargetPosition: (d) => d.coordinates,
        getSourceColor: [255, 190, 90],
        getTargetColor: [90, 190, 255],
        getWidth: 2,
      }),
    ],
    [
      show.dots &&
        new ScatterplotLayer<City>({
          id: 'spoke-dots',
          data: SPOKES,
          getPosition: (d) => d.coordinates,
          getRadius: 4,
          radiusUnits: 'pixels',
          getFillColor: [255, 255, 255],
        }),
      show.labels &&
        new TextLayer<City>({
          id: 'spoke-labels',
          data: SPOKES,
          getPosition: (d) => d.coordinates,
          getText: (d) => d.name,
          getSize: 12,
          getPixelOffset: [0, -14],
          getColor: [235, 240, 250],
          characterSet: 'auto',
          parameters: { depthCompare: 'always' },
        }),
    ],
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  if (!ctx.preview) {
    const bar = controlBar(el);
    const toggle = (key: keyof typeof show) => (v: boolean) => {
      show[key] = v;
      deck.setProps({ layers: layers() });
    };
    check(bar, 'arcs', true, toggle('arcs'));
    check(bar, 'dots', true, toggle('dots'));
    check(bar, 'labels', true, toggle('labels'));
  }

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 6) } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
