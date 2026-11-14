// MaskExtension maskByInstance: mask whole objects by anchor, or cut them by shape
import { Deck } from '@deck.gl/core';
import { GeoJsonLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MaskExtension, type MaskExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { circle, dots, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 40 : 70, 8, 2.5);
  let maskByInstance = true;
  let centre: [number, number] = [8, 47];

  const layers = () => [
    landLayer(),
    new GeoJsonLayer({
      id: 'lens',
      data: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [circle(centre, 2.6)] } },
      operation: 'mask',
    }),
    new ScatterplotLayer<Dot, MaskExtensionProps>({
      id: 'discs',
      data,
      getPosition: (d) => d.position,
      getRadius: 90_000,
      getFillColor: [255, 150, 70, 210],
      extensions: [new MaskExtension()],
      maskId: 'lens',
      // true: a disc draws whole when its centre is inside. false: only its inside part draws.
      maskByInstance,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: { longitude: 8, latitude: 47, zoom: ctx.preview ? 4.1 : 5 },
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      maskByInstance = Math.floor(t / 3) % 2 === 0;
      centre = [8 + 3 * Math.sin(t * 0.7), 47 + 1.5 * Math.sin(t * 1.1)];
      deck.setProps({ layers: layers() });
    });
  } else {
    check(controlBar(el), 'maskByInstance', true, (v) => {
      maskByInstance = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
