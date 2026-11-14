// BrushingExtension brushingTarget on arcs: source, target or source_target
import { Deck } from '@deck.gl/core';
import { ArcLayer } from '@deck.gl/layers';
import { BrushingExtension, type BrushingExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { EU_VIEW, links, wanderPointer, type Link } from '../../shared/extensions-data.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Target = NonNullable<BrushingExtensionProps['brushingTarget']>;
const TARGETS: readonly Target[] = ['source', 'target', 'source_target'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = links(ctx.preview ? 40 : 90);
  let brushingTarget: Target = 'source';

  const layers = () => [
    landLayer(),
    new ArcLayer<Link>({
      id: 'ghost-arcs',
      data,
      getSourcePosition: (d) => d.from,
      getTargetPosition: (d) => d.to,
      getSourceColor: [90, 110, 140, 90],
      getTargetColor: [90, 110, 140, 90],
      getWidth: 1,
    }),
    new ArcLayer<Link, BrushingExtensionProps<Link>>({
      id: 'brushed-arcs',
      data,
      getSourcePosition: (d) => d.from,
      getTargetPosition: (d) => d.to,
      getSourceColor: [255, 170, 70],
      getTargetColor: [90, 200, 255],
      getWidth: 2,
      brushingRadius: ctx.preview ? 500_000 : 350_000,
      // 'source' tests getSourcePosition, 'target' getTargetPosition, 'source_target' either
      brushingTarget,
      extensions: [new BrushingExtension()],
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
    const bar = controlBar(el);
    const note = readout(el, 'Orange ends are sources, blue ends targets. Move the pointer over the map.');
    select(bar, 'brushingTarget', TARGETS, (v) => {
      brushingTarget = v;
      note.textContent = `brushingTarget: '${v}'`;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
