// CollisionFilterExtension collisionTestProps: bigger footprints in the test, more spacing
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CollisionFilterExtension, type CollisionFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { dots, EU_VIEW, type Dot } from '../../shared/extensions-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = dots(ctx.preview ? 700 : 2500, 3, 2);
  let testScale = 2;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Dot, CollisionFilterExtensionProps<Dot>>({
      id: 'points',
      data,
      getPosition: (d) => d.position,
      getRadius: 6,
      radiusUnits: 'pixels',
      getFillColor: [255, 170, 70, 230],
      collisionEnabled: true,
      // Props overridden only while testing collisions: points are drawn at radius 6 but
      // tested as if scaled, so the survivors keep their distance. No accessors allowed here.
      collisionTestProps: { radiusScale: testScale },
      extensions: [new CollisionFilterExtension()],
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: ctx.preview ? { ...EU_VIEW, zoom: 3.3 } : { ...EU_VIEW, zoom: 5 },
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      testScale = 1 + 3 * (0.5 + 0.5 * Math.sin(t * 0.8));
      deck.setProps({ layers: layers() });
    });
  } else {
    slider(controlBar(el), 'collisionTestProps.radiusScale', 1, 8, 0.5, testScale, (v) => {
      testScale = v;
      deck.setProps({ layers: layers() });
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
