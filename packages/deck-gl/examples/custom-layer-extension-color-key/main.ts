// A LayerExtension, written once, filters a GeoJsonLayer's polygons, lines and points alike
import { Deck } from '@deck.gl/core';
import type { Color, MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, Geometry, Point } from 'geojson';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select } from '../../shared/controls.ts';
import { CITIES } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { countries, type CountryProps } from '../../shared/world.ts';
import { ColorKeyExtension, type ColorKeyProps } from './color-key-extension.ts';

type Feat = Feature<Geometry, CountryProps>;
const CHANNELS = ['red', 'green', 'blue'] as const;
const PALETTE: [number, number, number][] = [[235, 70, 60], [60, 200, 90], [70, 120, 240]];

// Countries are coloured red, green or blue by a hash of their name; cities are added as points.
const features: Feat[] = [
  ...countries.features,
  ...CITIES.map((c): Feature<Point, CountryProps> => ({
    type: 'Feature',
    properties: { name: c.name },
    geometry: { type: 'Point', coordinates: c.coordinates },
  })),
];
const hue = (f: Feat): number => [...f.properties.name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % 3;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.8 : 1.5 };
  const state: Required<ColorKeyProps> = { keyChannel: 0, keyEnabled: true };

  const layer = (): GeoJsonLayer<CountryProps, ColorKeyProps> =>
    new GeoJsonLayer<CountryProps, ColorKeyProps>({
      id: 'geo',
      data: features,
      filled: true,
      stroked: true,
      pointType: 'circle',
      getFillColor: (f: Feat): Color => {
        const [r, g, b] = PALETTE[hue(f)]!;
        return [r, g, b, 240];
      },
      getLineColor: [255, 255, 255, 120],
      getPointRadius: 80_000,
      pointRadiusMinPixels: 3,
      lineWidthMinPixels: 1,
      extensions: [new ColorKeyExtension()],
      // Extension props: forwarded to every sublayer by the extension's getSubLayerProps.
      keyChannel: state.keyChannel,
      keyEnabled: state.keyEnabled,
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer()] });
  const refresh = (): void => deck.setProps({ layers: [layer()] });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const next = Math.floor(t / 1.4) % 3;
      if (next !== state.keyChannel) {
        state.keyChannel = next;
        refresh();
      }
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'keep', CHANNELS, (v) => {
      state.keyChannel = CHANNELS.indexOf(v);
      refresh();
    });
    check(bar, 'keyEnabled', true, (v) => {
      state.keyEnabled = v;
      refresh();
    });
    readout(el, 'One extension, attached to a composite layer: it filters the fill, stroke and point sublayers.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
