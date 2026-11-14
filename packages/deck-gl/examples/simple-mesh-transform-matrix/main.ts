// SimpleMeshLayer getTransformMatrix: a 4x4 per instance
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { crystalMesh, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/**
 * Column-major 4x4: its columns are where the mesh's x, y and z axes land. Here z is
 * stretched by `tall` and sheared east by `lean` per unit height, then everything spins
 * about the vertical by `yaw` degrees.
 */
function tower(yaw: number, lean: number, tall: number): number[] {
  const c = Math.cos((yaw * Math.PI) / 180);
  const s = Math.sin((yaw * Math.PI) / 180);
  return [c, s, 0, 0, -s, c, 0, 0, lean * c, lean * s, tall, 0, 0, 0, 0, 1];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 10 : 22, 8);
  const mesh = crystalMesh(4, 1);
  let lean = 0.6;
  let turn = 0;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new SimpleMeshLayer<Site>({
          id: 'matrix',
          data,
          mesh,
          getPosition: (d) => d.position,
          getColor: (d) => [120 + d.height * 60, 220, 170, 255],
          // Overrides getOrientation, getScale and getTranslation when set.
          getTransformMatrix: (d) => tower(d.heading + turn, lean, 1 + d.height),
          updateTriggers: { getTransformMatrix: [lean, turn] },
          sizeScale: ctx.preview ? 160000 : 120000,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      lean = 0.8 * Math.sin(t);
      turn = t * 30;
      render();
      deck.setProps({ viewState: { ...view, bearing: t * 6 } });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'lean', -2, 2, 0.1, lean, (v) => {
      lean = v;
      render();
    });
    slider(bar, 'spin', 0, 360, 5, 0, (v) => {
      turn = v;
      render();
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
