// CollisionFilterExtension on a TextLayer: city labels declutter by population
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { CollisionFilterExtension, type CollisionFilterExtensionProps } from '@deck.gl/extensions';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  let collisionEnabled = true;
  const view = { longitude: 40, latitude: 30, zoom: ctx.preview ? 1.4 : 2.4 };

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({ id: 'dots', data: CITIES, getPosition: (d) => d.coordinates, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70] }),
    new TextLayer<City, CollisionFilterExtensionProps<City>>({
      id: 'labels',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getText: (d) => d.name,
      getSize: 12,
      getColor: [235, 240, 250],
      // The collision test samples the anchor point, so it must land on a drawn pixel:
      // the label sits 8 px above its dot and the padded background reaches back down to it.
      getPixelOffset: [0, -8],
      background: true,
      backgroundPadding: [4, 4],
      getBackgroundColor: [11, 22, 34, 200],
      collisionEnabled,
      // Big cities keep their label when two labels would overlap
      getCollisionPriority: (d) => d.population,
      extensions: [new CollisionFilterExtension()],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ viewState: { ...view, zoom: 1.0 + 0.8 * (0.5 + 0.5 * Math.sin(t * 0.5)) } });
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
