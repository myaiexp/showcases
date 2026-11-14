// PathStyleExtension dashMode: restart dashes at each vertex, or run along path
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension, type DashMode, type PathStyleExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { EU_VIEW, wigglyPaths } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Route = ReturnType<typeof wigglyPaths>[number];
const MODES: readonly DashMode[] = ['segment', 'path'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  // 40 short segments per path: in 'segment' mode each is shorter than a dash, so it draws solid
  const data = wigglyPaths(ctx.preview ? 8 : 12);
  let dashMode: DashMode = 'segment';

  const layers = () => [
    landLayer(),
    new PathLayer<Route, PathStyleExtensionProps<Route>>({
      // The mode is a constructor option: a new extension needs a new id
      id: `routes-${dashMode}`,
      data,
      getPath: (d) => d.path,
      getColor: [255, 170, 70],
      getWidth: 4,
      widthUnits: 'pixels',
      getDashArray: [4, 3],
      // 'segment' restarts the pattern at each vertex; 'path' runs one pattern along the whole path
      extensions: [new PathStyleExtension({ dashMode })],
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
      dashMode = MODES[Math.floor(t / 2.5) % 2]!;
      deck.setProps({ layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    const note = readout(el, "dashMode: 'segment'. Each path has 40 vertices, so the dashes keep starting over.");
    select(bar, 'dashMode', MODES, (v) => {
      dashMode = v;
      note.textContent = v === 'path' ? "dashMode: 'path'. One continuous pattern per path." : "dashMode: 'segment'. Each path has 40 vertices, so the dashes keep starting over.";
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
