// data.attributes with one interleaved Buffer: x,y,z then r,g,b per point, rewritten per frame
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { animate, createStage } from '../../shared/stage.ts';

const GRID = 120;
const STRIDE_FLOATS = 6;
const STRIDE_BYTES = STRIDE_FLOATS * 4;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#070b12' });
  const view: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 11.2 : 12, pitch: 55, bearing: 20 };
  const grid = ctx.preview ? 70 : GRID;
  const count = grid * grid;

  // x0,y0,z0, r0,g0,b0, x1,...: positions in degrees and metres, colours normalized 0-1 floats.
  const values = new Float32Array(count * STRIDE_FLOATS);
  const fill = (t: number): void => {
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const o = (i * grid + j) * STRIDE_FLOATS;
        const x = (i / grid - 0.5) * 0.12;
        const y = (j / grid - 0.5) * 0.12;
        const h = Math.sin(Math.hypot(x, y) * 160 - t * 2.5) * 260;
        values[o] = x;
        values[o + 1] = y;
        values[o + 2] = h;
        const k = h / 520 + 0.5;
        values[o + 3] = 0.2 + k * 0.8;
        values[o + 4] = 0.5 + (1 - Math.abs(k - 0.5) * 2) * 0.4;
        values[o + 5] = 1 - k * 0.8;
      }
    }
  };
  fill(0);
  const buffer = stage.device.createBuffer({ data: values });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      new PointCloudLayer({
        id: 'wave',
        data: {
          length: count,
          attributes: {
            // Same buffer, two attributes: 3 floats at byte 0 and 3 floats at byte 12, 24 bytes apart.
            getPosition: { buffer, size: 3, type: 'float32', offset: 0, stride: STRIDE_BYTES },
            // Colours are read as floats here, not the default 8-bit integers.
            getColor: { buffer, size: 3, type: 'float32', offset: 12, stride: STRIDE_BYTES },
          },
        },
        pointSize: 3,
        getNormal: [0, 0, 1],
      }),
    ],
  });

  const stop = animate((t) => {
    fill(t);
    buffer.write(values);
    // The layer prop did not change, so ask Deck for a frame.
    deck.redraw('buffer written');
  });
  return () => {
    stop();
    // Our own buffer first, then the deck and its device.
    buffer.destroy();
    stage.release(deck);
  };
};

export default mount;
