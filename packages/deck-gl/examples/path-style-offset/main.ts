// PathStyleExtension offset: getOffset shifts each path sideways, in stroke widths
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { EU_VIEW, wigglyPaths } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Lane {
  path: [number, number][];
  /** -1 = left of the path's direction, +1 = right */
  side: -1 | 1;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // Each route twice: the same geometry, one copy shifted left and one right
  const data: Lane[] = wigglyPaths(ctx.preview ? 5 : 7, [8, 47]).flatMap((r) => [
    { path: r.path, side: -1 as const },
    { path: r.path, side: 1 as const },
  ]);
  let spread = 1;

  const layers = () => [
    landLayer(),
    new PathLayer<Lane, PathStyleExtensionProps<Lane>>({
      id: 'lanes',
      data,
      getPath: (d) => d.path,
      getColor: (d) => (d.side < 0 ? [90, 180, 255] : [255, 170, 70]),
      getWidth: 4,
      widthUnits: 'pixels',
      // Multiples of the stroke width: +1 on a 4 px line sits 4 px to the right
      getOffset: (d) => d.side * spread,
      extensions: [new PathStyleExtension({ offset: true })],
      updateTriggers: { getOffset: spread },
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
      spread = 0.2 + 1.6 * (0.5 + 0.5 * Math.sin(t * 0.9));
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'getOffset (stroke widths)', 0, 4, 0.1, spread, (v) => {
      spread = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
