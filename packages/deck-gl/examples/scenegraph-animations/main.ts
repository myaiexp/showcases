// ScenegraphLayer _animations: a glTF spin built in code, speed and playing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { gltfDataUrl, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 10 : 18, 6);
  const scenegraph = gltfDataUrl({ animated: true, color: [0.3, 0.8, 0.9, 1], metallic: 0.1, roughness: 0.6 });
  let speed = 1;
  let playing = true;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new ScenegraphLayer<Site>({
          id: 'animated-gltf',
          data,
          scenegraph,
          // '*' addresses every animation in the file; a number or an animation name picks one.
          _animations: { '*': { playing, speed } },
          _lighting: 'pbr',
          getPosition: (d) => d.position,
          getOrientation: (d) => [0, d.heading, 90],
          sizeScale: ctx.preview ? 200000 : 150000,
        }),
      ],
    });
  };

  // Animations only advance while the Deck redraws every frame: _animate keeps it drawing.
  const deck = new Deck({
    device: stage.device,
    _animate: true,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [],
  });
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 6 } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'speed', 0, 6, 0.5, speed, (v) => {
      speed = v;
      render();
    });
    check(bar, 'playing', playing, (v) => {
      playing = v;
      render();
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
