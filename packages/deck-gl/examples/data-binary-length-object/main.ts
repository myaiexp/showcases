// data = {src, length}: a non-iterable object, so accessors read a typed array
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { gaussian, seeded } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** lon, lat, radius, r, g, b per point: six numbers, the layout the guide uses. */
const STRIDE = 6;

function pack(count: number): Float32Array {
  const rand = seeded(8);
  const src = new Float32Array(count * STRIDE);
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.abs(gaussian(rand)) * 2.2;
    const o = i * STRIDE;
    src[o] = Math.cos(a + r) * r;
    src[o + 1] = Math.sin(a + r) * r * 0.7;
    src[o + 2] = 800 + rand() * 3000;
    src[o + 3] = 255 - r * 40;
    src[o + 4] = 120 + rand() * 100;
    src[o + 5] = 60 + r * 60;
  }
  return src;
}

interface Packed {
  src: Float32Array;
  length: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#070b12' });
  const view: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 4.4 : 5 };
  const count = ctx.preview ? 8000 : 50_000;
  // binaryData.length is not the item count, so the wrapper carries a custom length field.
  const DATA: Packed = { src: pack(count), length: count };
  let useTarget = true;
  const label = ctx.preview ? null : readout(el);

  const layers = () => [
    new ScatterplotLayer<Packed>({
      id: 'binary',
      data: DATA,
      // The object is not iterable, so accessors get no usable first argument: read by index.
      // The data argument is typed loosely by the library; DATA is what we passed in.
      getPosition: (_, { index, data, target }) => {
        const src = (data as unknown as Packed).src;
        if (!useTarget) return src.subarray(index * STRIDE, index * STRIDE + 2) as unknown as [number, number];
        // Writing into the pre-allocated target avoids a new array per point.
        target[0] = src[index * STRIDE]!;
        target[1] = src[index * STRIDE + 1]!;
        target[2] = 0;
        return target as unknown as [number, number, number];
      },
      getRadius: (_, { index, data }) => (data as unknown as Packed).src[index * STRIDE + 2]!,
      getFillColor: (_, { index, data, target }) => {
        const src = (data as unknown as Packed).src;
        target[0] = src[index * STRIDE + 3]!;
        target[1] = src[index * STRIDE + 4]!;
        target[2] = src[index * STRIDE + 5]!;
        target[3] = 220;
        return target as unknown as [number, number, number, number];
      },
      updateTriggers: { getPosition: useTarget },
      radiusMinPixels: 1,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  if (label) label.textContent = `${count} points from ${DATA.src.length} floats; no JavaScript objects per point`;

  const stops: (() => void)[] = [];
  if (ctx.preview) stops.push(animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 10 } })));
  else {
    check(controlBar(el), 'write into target (off: subarray per point)', true, (v) => {
      useTarget = v;
      deck.setProps({ layers: layers() });
    });
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
