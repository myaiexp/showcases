// MaskExtension with three masks at once: each layer reads the mask named by its maskId
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MaskExtension, type MaskExtensionProps } from '@deck.gl/extensions';
import type { Feature, Polygon } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { circle, dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const poly = (ring: [number, number][]): Feature<Polygon> => ({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [ring] } });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 1000 : 3500, 3, 2.6);
  let shift = 0;

  const masked = (id: string, maskId: string, color: [number, number, number]) =>
    new ScatterplotLayer<Dot, MaskExtensionProps>({
      id,
      data,
      getPosition: (d) => d.position,
      getRadius: 12000,
      radiusMinPixels: 3,
      getFillColor: [...color, 230],
      extensions: [new MaskExtension()],
      maskId,
    });

  const layers = () => [
    landLayer(),
    // Up to 4 masks can be active together; each is a layer with operation: 'mask'
    new GeoJsonLayer({ id: 'mask-a', data: poly(circle([2 + shift, 48], 4)), operation: 'mask' }),
    new GeoJsonLayer({ id: 'mask-b', data: poly(circle([14 - shift, 46], 4)), operation: 'mask' }),
    new GeoJsonLayer({ id: 'mask-c', data: poly([[-4, 40], [20, 40], [20, 43], [-4, 43], [-4, 40]]), operation: 'mask' }),
    masked('orange', 'mask-a', [255, 150, 70]),
    masked('blue', 'mask-b', [90, 180, 255]),
    masked('green', 'mask-c', [90, 220, 150]),
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
      shift = 5 + 4 * Math.sin(t * 0.7);
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'move circles together (deg)', 0, 10, 0.5, 0, (v) => {
      shift = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
