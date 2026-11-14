// SolidPolygonLayer fed binary attributes: packed vertices, heights and colours
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { HOME, blocks } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** Packs every block into flat buffers; each vertex repeats its polygon's height and colour. */
function pack(): { length: number; startIndices: Uint32Array; positions: Float64Array; elevations: Float32Array; colors: Uint8Array } {
  const all = blocks(8, 6, { seed: 12 });
  const positions: number[] = [];
  const elevations: number[] = [];
  const colors: number[] = [];
  const starts: number[] = [0];
  for (const b of all) {
    for (const [x, y] of b.polygon) {
      positions.push(x, y);
      elevations.push(b.height);
      colors.push(60 + b.value * 190, 130 + b.value * 60, 240 - b.value * 150);
    }
    starts.push(starts[starts.length - 1]! + b.polygon.length);
  }
  return {
    length: all.length,
    startIndices: new Uint32Array(starts),
    positions: new Float64Array(positions),
    elevations: new Float32Array(elevations),
    colors: new Uint8Array(colors),
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.2 : 12.8, pitch: 55, bearing: 10 };
  const packed = pack();

  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [
      new SolidPolygonLayer({
        id: 'binary-solid',
        data: {
          length: packed.length,
          // Vertex index where each polygon starts: required with binary attributes.
          startIndices: packed.startIndices,
          attributes: {
            getPolygon: { value: packed.positions, size: 2 },
            // Every other attribute has one value per vertex, in the getPolygon layout.
            getElevation: { value: packed.elevations, size: 1 },
            getFillColor: { value: packed.colors, size: 3 },
          },
        },
        extruded: true,
        // Use the buffers as they are.
        _normalize: false,
      }),
    ],
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: 10 + t * 10 } }))
    : () => {};

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
