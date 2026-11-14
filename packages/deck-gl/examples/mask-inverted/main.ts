// MaskExtension maskInverted: one mask, normal in one layer, inverted in another
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MaskExtension, type MaskExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { circle, dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 900 : 3000, 3, 2.2);
  let radius = 5;
  let centre: [number, number] = [8, 47];
  let inverted = true;

  const layers = () => [
    landLayer(),
    new GeoJsonLayer({
      id: 'lens',
      data: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [circle(centre, radius)] } },
      operation: 'mask',
    }),
    new ScatterplotLayer<Dot, MaskExtensionProps>({
      id: 'inside',
      data,
      getPosition: (d) => d.position,
      getRadius: 12000,
      radiusMinPixels: 3,
      getFillColor: [255, 170, 70, 240],
      extensions: [new MaskExtension()],
      maskId: 'lens',
    }),
    new ScatterplotLayer<Dot, MaskExtensionProps>({
      id: 'outside',
      data,
      getPosition: (d) => d.position,
      getRadius: 12000,
      radiusMinPixels: 3,
      getFillColor: [90, 180, 255, 240],
      extensions: [new MaskExtension()],
      maskId: 'lens',
      // Inversion is applied when the mask is read, so the same mask serves both layers
      maskInverted: inverted,
      visible: inverted,
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
    const bar = controlBar(el);
    slider(bar, 'mask radius (deg)', 1, 10, 0.5, radius, (v) => {
      radius = v;
      deck.setProps({ layers: layers() });
    });
    check(bar, 'second layer: maskInverted', true, (v) => {
      inverted = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
