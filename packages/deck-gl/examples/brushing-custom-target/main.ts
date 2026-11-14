// BrushingExtension custom target: paths brushed by a position from getBrushingTarget
import { Deck } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';
import { BrushingExtension, type BrushingExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { EU_VIEW, wanderPointer, wigglyPaths } from '../../shared/extensions-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import type { LngLat } from '../../shared/data.ts';

type Route = ReturnType<typeof wigglyPaths>[number];
const ANCHORS = ['start', 'middle', 'end'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = wigglyPaths(ctx.preview ? 14 : 22);
  let anchor: (typeof ANCHORS)[number] = 'middle';
  const pick = (d: Route): LngLat => d.path[anchor === 'start' ? 0 : anchor === 'end' ? d.path.length - 1 : 20]!;

  const layers = () => [
    landLayer(),
    new PathLayer<Route>({ id: 'ghost-paths', data, getPath: (d) => d.path, getColor: [90, 110, 140, 90], getWidth: 1, widthUnits: 'pixels' }),
    new PathLayer<Route, BrushingExtensionProps<Route>>({
      id: 'brushed-paths',
      data,
      getPath: (d) => d.path,
      getColor: [255, 170, 70],
      getWidth: 3,
      widthUnits: 'pixels',
      brushingRadius: ctx.preview ? 500_000 : 350_000,
      // A path has no single position: 'custom' filters by what getBrushingTarget returns.
      brushingTarget: 'custom',
      getBrushingTarget: pick,
      extensions: [new BrushingExtension()],
      updateTriggers: { getBrushingTarget: anchor },
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
    stop = wanderPointer(stage);
  } else {
    select(controlBar(el), 'getBrushingTarget returns the path\'s', ANCHORS, (v) => {
      anchor = v;
      deck.setProps({ layers: layers() });
    }, 'middle');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
