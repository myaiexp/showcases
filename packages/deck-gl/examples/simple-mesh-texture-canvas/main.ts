// SimpleMeshLayer texture: a canvas drawn in code, mapped by texCoords
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select } from '../../shared/controls.ts';
import { crystalMesh, sites, stripeTexture, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const FILTERS = ['linear', 'nearest'] as const;
type Filter = (typeof FILTERS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55 };
  const data = sites(ctx.preview ? 12 : 24, 3);
  const mesh = crystalMesh(6, 1.6);
  // A 12px canvas: low enough that the filter choice shows.
  const canvas = stripeTexture(12);
  let textured = true;
  let filter: Filter = 'linear';

  const render = (): void => {
    deck.setProps({
      layers: [
        landLayer(),
        new SimpleMeshLayer<Site>({
          // The texture is only read at creation, so a new filter needs a new layer id.
          id: `textured-${filter}`,
          data,
          mesh,
          // With a texture, getColor is ignored; without one it paints the mesh.
          texture: textured ? canvas : undefined,
          textureParameters: { minFilter: filter, magFilter: filter, mipmapFilter: 'none' },
          getPosition: (d) => d.position,
          getColor: [140, 200, 255, 255],
          getOrientation: (d) => [0, d.heading, 0],
          sizeScale: ctx.preview ? 160000 : 120000,
        }),
      ],
    });
  };

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [] });
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 12 } }));
  } else {
    const bar = controlBar(el);
    check(bar, 'texture', textured, (v) => {
      textured = v;
      render();
    });
    select(bar, 'magFilter / minFilter', FILTERS, (v) => {
      filter = v;
      render();
    }, filter);
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
