// MaskExtension: dots draw only inside a geofence layer marked operation: 'mask'
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MaskExtension, type MaskExtensionProps } from '@deck.gl/extensions';
import type { Feature, Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { circle, dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { countries, landLayer, type CountryProps } from '../../shared/world.ts';

const SHAPES = ['circle', 'France', 'Germany', 'Spain', 'Italy', 'Poland'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 900 : 3000, 3, 2.2);
  let shape: (typeof SHAPES)[number] = 'circle';
  let centre: [number, number] = [8, 47];

  const fence = (): Feature<Geometry> =>
    shape === 'circle'
      ? { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [circle(centre, 5)] } }
      : countries.features.find((f) => f.properties.name === shape)!;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot>({ id: 'all-dots', data, getPosition: (d) => d.position, getRadius: 8000, radiusMinPixels: 2, getFillColor: [130, 150, 180, 90] }),
    // A mask layer is never drawn: it only defines the region
    new GeoJsonLayer<CountryProps>({ id: 'geofence', data: fence(), operation: 'mask' }),
    new ScatterplotLayer<Dot, MaskExtensionProps>({
      id: 'inside',
      data,
      getPosition: (d) => d.position,
      getRadius: 12000,
      radiusMinPixels: 3,
      getFillColor: [255, 170, 70, 240],
      // Only objects inside the layer with this id render
      extensions: [new MaskExtension()],
      maskId: 'geofence',
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      centre = [8 + 8 * Math.sin(t * 0.7), 47 + 4 * Math.sin(t * 1.1)];
      deck.setProps({ layers: layers() });
    });
  } else {
    select(controlBar(el), 'geofence', SHAPES, (v) => {
      shape = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
