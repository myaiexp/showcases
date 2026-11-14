// PathStyleExtension dashJustified: stretch gaps so every corner lands on a dash
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { blobs, EU_VIEW, type Blob } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = blobs(ctx.preview ? 8 : 14, 11);
  let dashJustified = true;

  const layers = () => [
    landLayer(),
    new PathLayer<Blob, PathStyleExtensionProps<Blob>>({
      id: 'outlines',
      data,
      getPath: (d) => d.polygon,
      getColor: [255, 170, 70],
      getWidth: 5,
      widthUnits: 'pixels',
      getDashArray: [3, 2],
      // Fits the pattern to each edge so it starts and ends on half a dash: a dash at every corner
      dashJustified,
      // 'segment' mode fits each edge on its own, which is what an outline wants
      extensions: [new PathStyleExtension({ dash: true, dashMode: 'segment' })],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : { ...EU_VIEW, zoom: 3.3 },
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      dashJustified = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    check(controlBar(el), 'dashJustified', true, (v) => {
      dashJustified = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
