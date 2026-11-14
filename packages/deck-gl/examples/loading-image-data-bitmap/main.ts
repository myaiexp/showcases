// BitmapLayer image: new ImageData(pixels, w, h), no loader and no URL
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** RGBA pixels of a moving plasma: pure arithmetic, nothing fetched. */
function plasma(size: number, t: number, hueShift: number): ImageData {
  const pixels = new Uint8ClampedArray(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const s = Math.sin(u * 9 + t) + Math.sin(v * 7 - t * 1.3) + Math.sin((u + v) * 6 + t * 0.7) + Math.sin(Math.hypot(u - 0.5, v - 0.5) * 12 - t);
      const k = s / 8 + 0.5;
      const o = (y * size + x) * 4;
      pixels[o] = 255 * (0.5 + 0.5 * Math.sin(k * 6.28 + hueShift));
      pixels[o + 1] = 255 * (0.5 + 0.5 * Math.sin(k * 6.28 + hueShift + 2.1));
      pixels[o + 2] = 255 * (0.5 + 0.5 * Math.sin(k * 6.28 + hueShift + 4.2));
      pixels[o + 3] = 255;
    }
  }
  return new ImageData(pixels, size, size);
}

const SIZES = { '64 x 64': 64, '128 x 128': 128, '256 x 256': 256 };
type SizeKey = keyof typeof SIZES;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#0b1018' });
  const view: MapViewState = { longitude: 0, latitude: 0, zoom: ctx.preview ? 3.6 : 5 };
  let size = ctx.preview ? 48 : 128;

  const layer = (t: number) =>
    new BitmapLayer({
      id: 'plasma',
      // [west, south, east, north]
      bounds: [-8, -5, 8, 5],
      image: plasma(size, t, 0),
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [layer(0)] });
  const stop = animate((t) => deck.setProps({ layers: [layer(t)] }));

  if (!ctx.preview) {
    select(controlBar(el), 'pixels', Object.keys(SIZES) as SizeKey[], (v) => (size = SIZES[v]), '128 x 128');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
