// SimpleMeshLayer getOrientation, getScale and getTranslation per instance
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { crystalMesh, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type V3 = [number, number, number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 9 : 16, 21);
  const mesh = crystalMesh(4, 1.2);
  const orientation: V3 = [0, 0, 0];
  let stretch = 1;
  let lift = 0;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new SimpleMeshLayer<Site>({
          id: 'transformed',
          data,
          mesh,
          getPosition: (d) => d.position,
          getColor: (d) => [255, 150 + d.height * 50, 90, 255],
          // [pitch, yaw, roll] in degrees: yaw spins about the vertical, pitch about the east
          // axis and roll about the north axis. The per-site heading is added to the yaw.
          getOrientation: (d) => [orientation[0], orientation[1] + d.heading, orientation[2]],
          // Scale along each mesh axis, then translate in metres from the anchor point.
          getScale: [1, 1, stretch],
          getTranslation: [0, 0, lift],
          updateTriggers: { getOrientation: [...orientation], getScale: stretch, getTranslation: lift },
          sizeScale: ctx.preview ? 170000 : 130000,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      orientation[0] = Math.sin(t) * 40;
      orientation[2] = Math.cos(t * 0.8) * 40;
      stretch = 1 + Math.sin(t * 1.3) * 0.5;
      lift = 100000 + Math.sin(t * 1.6) * 100000;
      render();
      deck.setProps({ viewState: { ...view, bearing: t * 8 } });
    });
  } else {
    const bar = controlBar(el);
    for (const [i, name] of ['pitch', 'yaw', 'roll'].entries()) {
      slider(bar, name, -90, 90, 5, 0, (v) => {
        orientation[i] = v;
        render();
      });
    }
    slider(bar, 'scale z', 0.2, 3, 0.1, 1, (v) => {
      stretch = v;
      render();
    });
    slider(bar, 'translate z (km)', 0, 600, 20, 0, (v) => {
      lift = v * 1000;
      render();
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
