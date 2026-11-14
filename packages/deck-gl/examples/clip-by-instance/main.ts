// ClipExtension clipByInstance: clip circles by their anchor point or by their shape
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ClipExtension, type ClipExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { dots, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 40 : 70, 8, 2.5);
  let clipByInstance = true;
  let clipBounds: [number, number, number, number] = [3, 43, 13, 51];

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, ClipExtensionProps>({
      id: 'discs',
      data,
      getPosition: (d) => d.position,
      getRadius: 90_000,
      getFillColor: [255, 150, 70, 200],
      getLineColor: [255, 255, 255],
      stroked: true,
      lineWidthMinPixels: 1,
      clipBounds,
      // true: a disc is kept or dropped whole by its centre. false: the disc is cut at the edge.
      clipByInstance,
      extensions: [new ClipExtension()],
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
      clipByInstance = Math.floor(t / 2) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    check(controlBar(el), 'clipByInstance', true, (v) => {
      clipByInstance = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
