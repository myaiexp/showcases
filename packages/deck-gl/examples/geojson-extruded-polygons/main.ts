// GeoJsonLayer: extruded countries with getElevation and material
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { countries, type CountryProps } from '../../shared/world.ts';

type Country = Feature<Geometry, CountryProps>;

/** A stand-in height in 1..8 from the name, so the same country is always the same height. */
function height(f: Country): number {
  let h = 0;
  for (const ch of f.properties.name) h = (h * 31 + ch.charCodeAt(0)) % 8;
  return h + 1;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4, pitch: 55, bearing: 10 };

  const layer = (elevationScale: number, ambient: number): GeoJsonLayer<CountryProps> =>
    new GeoJsonLayer<CountryProps>({
      id: 'countries',
      data: countries,
      extruded: true,
      getElevation: height, // 1..8, scaled to metres below
      elevationScale: elevationScale * 100_000,
      getFillColor: (f) => [40 + height(f as Country) * 25, 120, 230 - height(f as Country) * 20],
      getLineColor: [255, 255, 255],
      material: { ambient, diffuse: 0.6, shininess: 32, specularColor: [0.3, 0.3, 0.3] },
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer(1, 0.35)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [layer(0.5 + (1 + Math.sin(t)) * 0.4, 0.35)], viewState: { ...view, bearing: 10 + t * 5 } }));
  } else {
    let [scale, ambient] = [1, 0.35];
    const refresh = (): void => deck.setProps({ layers: [layer(scale, ambient)] });
    const bar = controlBar(el);
    slider(bar, 'elevationScale', 0, 3, 0.1, scale, (v) => ((scale = v), refresh()));
    slider(bar, 'material.ambient', 0, 1, 0.05, ambient, (v) => ((ambient = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
