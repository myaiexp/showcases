// CollisionFilterExtension: of the points that overlap on screen, only one is drawn
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CollisionFilterExtension, type CollisionFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 700 : 2500, 3, 2);
  let collisionEnabled = true;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, CollisionFilterExtensionProps<Dot>>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      getRadius: 8,
      radiusUnits: 'pixels',
      getFillColor: [255, 170, 70, 230],
      // Collisions are computed on the GPU every frame, so zooming re-declutters live.
      collisionEnabled,
      extensions: [new CollisionFilterExtension()],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: EU_VIEW, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ viewState: { ...EU_VIEW, zoom: 3 + 1.2 * (0.5 + 0.5 * Math.sin(t * 0.6)) } });
    });
  } else {
    check(controlBar(el), 'collisionEnabled', true, (v) => {
      collisionEnabled = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
