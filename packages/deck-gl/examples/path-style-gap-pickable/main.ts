// PathStyleExtension dashGapPickable: hover the gaps between dashes, or not
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { EU_VIEW, wigglyPaths } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Route = ReturnType<typeof wigglyPaths>[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = wigglyPaths(ctx.preview ? 8 : 10);
  let dashGapPickable = false;
  let hovered: string | null = null;
  let line: HTMLElement | null = null;

  const layers = () => [
    landLayer(),
    new PathLayer<Route, PathStyleExtensionProps<Route>>({
      id: 'routes',
      data,
      getPath: (d) => d.path,
      getColor: [255, 170, 70],
      getWidth: 8,
      widthUnits: 'pixels',
      getDashArray: [2, 3],
      // true: the gaps count for picking. false (default): only the dashes do.
      dashGapPickable,
      pickable: !ctx.preview,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 220],
      extensions: [new PathStyleExtension({ dash: true, dashMode: 'path' })],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : EU_VIEW,
    controller: !ctx.preview,
    layers: layers(),
    onHover: ({ object }) => {
      hovered = object ? (object as Route).name : null;
      if (line) line.textContent = hovered ? `hovering ${hovered}` : 'hovering nothing';
    },
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      dashGapPickable = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    line = readout(el, 'hovering nothing. Move the pointer along a route, over the gaps too.');
    check(bar, 'dashGapPickable', false, (v) => {
      dashGapPickable = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    line = null;
    stage.release(deck);
  };
};

export default mount;
