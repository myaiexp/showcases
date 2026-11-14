// SimpleMeshLayer: a mesh object built in code (positions, normals, uvs)
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { crystalMesh, sites, type Site } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 50, zoom: ctx.preview ? 2.6 : 3.6, pitch: 55, bearing: 0 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    getTooltip: ({ object }: PickingInfo<Site>) => (object ? `heading ${object.heading.toFixed(0)}°` : null),
    layers: [
      landLayer(),
      new SimpleMeshLayer<Site>({
        id: 'crystals',
        data: sites(ctx.preview ? 14 : 30),
        // A plain object: each attribute is { size, value }. Positions are metre offsets from
        // the instance's getPosition, scaled by sizeScale.
        mesh: crystalMesh(6, 1.6),
        getPosition: (d) => d.position,
        getColor: (d) => [90 + d.height * 70, 190 - d.height * 50, 255, 255],
        getOrientation: (d) => [0, d.heading, 0],
        getScale: (d) => [1, 1, d.height],
        sizeScale: ctx.preview ? 160000 : 120000,
        pickable: true,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 12, longitude: 10 + Math.sin(t / 3) * 6 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
