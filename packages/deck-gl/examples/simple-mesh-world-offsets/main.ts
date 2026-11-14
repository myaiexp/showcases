// SimpleMeshLayer _instanced false: mesh positions as lng/lat offsets
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { SimpleMeshLayer } from '@deck.gl/mesh-layers';
import type { Mount } from '@/types.ts';
import { crystalMesh, type CrystalMesh } from '../../shared/mesh-layers-assets.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Anchor {
  name: string;
  position: [number, number];
}

/** The unit crystal with x and y multiplied by `deg` and z by `metres`. */
function stretched(deg: number, metres: number): CrystalMesh {
  const base = crystalMesh(6, 1);
  const value = base.positions.value.map((v, i) => v * (i % 3 === 2 ? metres : deg));
  return { ...base, positions: { size: 3, value } };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 5, latitude: 52, zoom: ctx.preview ? 2.4 : 3.3, pitch: 45 };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    getTooltip: ({ object }: PickingInfo<Anchor>) => (object ? object.name : null),
    layers: [
      landLayer(),
      // Default: positions are metre offsets, scaled by sizeScale.
      new SimpleMeshLayer<Anchor>({
        id: 'metres',
        data: [{ name: 'positions are metre offsets (_instanced: true)', position: [-6, 50] }],
        mesh: crystalMesh(6, 1.6),
        getPosition: (d) => d.position,
        getColor: [255, 150, 80, 255],
        sizeScale: 250000,
        pickable: true,
      }),
      // One instance with _instanced: false: positions are added to the anchor in lng/lat
      // degrees (z stays in metres), so the shape is stretched by the map projection.
      new SimpleMeshLayer<Anchor>({
        id: 'degrees',
        data: [{ name: 'positions are lng/lat deltas (_instanced: false)', position: [14, 50] }],
        mesh: stretched(4, 500000),
        _instanced: false,
        getPosition: (d) => d.position,
        getColor: [90, 200, 255, 255],
        pickable: true,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, bearing: Math.sin(t / 3) * 40 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
