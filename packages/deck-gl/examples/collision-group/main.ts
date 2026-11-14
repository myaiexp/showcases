// CollisionFilterExtension collisionGroup: layers in one group avoid each other
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
  const n = ctx.preview ? 250 : 800;
  const orange = dots(n, 3, 2);
  const blue = dots(n, 4, 2);
  let shared = true;

  const make = (id: string, data: Dot[], color: [number, number, number], group: string) =>
    new ScatterplotLayer<Dot, CollisionFilterExtensionProps<Dot>>({
      id,
      data,
      getPosition: (d) => d.position,
      getRadius: 9,
      radiusUnits: 'pixels',
      getFillColor: [...color, 220],
      collisionEnabled: true,
      // Layers that share a collisionGroup are tested together; others never hide each other.
      collisionGroup: group,
      extensions: [new CollisionFilterExtension()],
    });

  const layers = () => [
    landLayer(),
    make('orange', orange, [255, 150, 70], 'orange'),
    make('blue', blue, [90, 180, 255], shared ? 'orange' : 'blue'),
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
      shared = Math.floor(t / 2.5) % 2 === 0;
      deck.setProps({ layers: layers() });
    });
  } else {
    check(controlBar(el), 'blue layer shares the orange collisionGroup', true, (v) => {
      shared = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
