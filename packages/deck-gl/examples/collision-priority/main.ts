// CollisionFilterExtension getCollisionPriority: the higher priority wins an overlap
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CollisionFilterExtension, type CollisionFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const MODES = ['value wins', 'value loses', 'no priority'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 700 : 2500, 3, 2);
  let mode: Mode = 'value wins';

  const priority = (d: Dot): number => (mode === 'value wins' ? d.value * 1000 : mode === 'value loses' ? -d.value * 1000 : 0);

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, CollisionFilterExtensionProps<Dot>>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      getRadius: 9,
      radiusUnits: 'pixels',
      // Brighter = higher value. Where two overlap, the one with the higher priority is shown.
      getFillColor: (d) => [60 + d.value * 195, 120 + d.value * 100, 255 - d.value * 185, 235],
      collisionEnabled: true,
      // A number in -1000..1000: higher is shown preferentially
      getCollisionPriority: priority,
      extensions: [new CollisionFilterExtension()],
      updateTriggers: { getCollisionPriority: mode },
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
      mode = MODES[Math.floor(t / 2.5) % 2]!;
      deck.setProps({ layers: layers() });
    });
  } else {
    select(controlBar(el), 'getCollisionPriority', MODES, (v) => {
      mode = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
