// ScenegraphLayer given a parsed glTF, with getColor and size limits
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { parse } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import type { Mount } from '@/types.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { buildGltf, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 10 : 22, 17);
  // A white base colour, so getColor decides each instance's tint.
  const bytes = new TextEncoder().encode(JSON.stringify(buildGltf({ color: [1, 1, 1, 1], metallic: 0 })));
  // The scenegraph prop also takes a parsed glTF (or a Promise of one), not only a URL.
  const gltf = parse(bytes.buffer, GLTFLoader);
  let minPixels = 0;
  let maxPixels = 60;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new ScenegraphLayer<Site>({
          id: 'parsed-gltf',
          data,
          scenegraph: gltf,
          _lighting: 'pbr',
          getPosition: (d) => d.position,
          getOrientation: (d) => [0, d.heading, 90],
          getColor: (d) => [255 - d.height * 100, 120 + d.height * 80, 255 * (1 - d.height / 2), 255],
          sizeScale: 140000,
          // One scene unit is clamped to this many pixels on screen.
          sizeMinPixels: minPixels,
          sizeMaxPixels: maxPixels,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 10, zoom: 2.6 + Math.sin(t / 2) * 0.5 } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'sizeMinPixels', 0, 40, 2, minPixels, (v) => {
      minPixels = v;
      render();
    });
    slider(bar, 'sizeMaxPixels', 5, 80, 5, maxPixels, (v) => {
      maxPixels = v;
      render();
    });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
