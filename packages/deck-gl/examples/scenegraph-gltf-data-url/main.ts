// ScenegraphLayer: a glTF built in code, loaded from a data: URL
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { gltfDataUrl, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const LIGHTING = ['pbr', 'flat'] as const;
type Lighting = (typeof LIGHTING)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 10 : 20, 2);
  // The scenegraph prop takes a URL; a data: URL carries the whole glTF with its buffer inline.
  const scenegraph = gltfDataUrl({ color: [0.95, 0.5, 0.2, 1], metallic: 0.1, roughness: 0.6 });
  let lighting: Lighting = 'pbr';
  let sizeScale = ctx.preview ? 200000 : 150000;

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new ScenegraphLayer<Site>({
          // _lighting is only read when the scenegraph loads: a new mode needs a new id.
          id: `gltf-${lighting}`,
          data,
          scenegraph,
          _lighting: lighting,
          getPosition: (d) => d.position,
          // glTF is y-up: a roll of 90 degrees stands the model on the map.
          getOrientation: (d) => [0, d.heading, 90],
          sizeScale,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    timer = window.setInterval(() => {
      lighting = lighting === 'pbr' ? 'flat' : 'pbr';
      render();
    }, 1800);
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 12 } }));
  } else {
    const bar = controlBar(el);
    select(bar, '_lighting', LIGHTING, (v) => {
      lighting = v;
      render();
    }, lighting);
    slider(bar, 'sizeScale', 50000, 300000, 10000, sizeScale, (v) => {
      sizeScale = v;
      render();
    });
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
