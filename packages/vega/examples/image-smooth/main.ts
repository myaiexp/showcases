// smooth false scales individual pixels of a tiny image instead of blending them
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

/** An 8x8 24-bit BMP with a diagonal gradient and a checkered ring, as a data: URL. */
function pixels(): string {
  const n = 8;
  const row = n * 3;
  const bytes = new Uint8Array(54 + row * n);
  const dv = new DataView(bytes.buffer);
  bytes.set([0x42, 0x4d]);
  dv.setUint32(2, bytes.length, true);
  dv.setUint32(10, 54, true);
  dv.setUint32(14, 40, true);
  dv.setInt32(18, n, true);
  dv.setInt32(22, n, true);
  dv.setUint16(26, 1, true);
  dv.setUint16(28, 24, true);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const ring = Math.max(Math.abs(x - 3.5), Math.abs(y - 3.5)) > 2.5 && (x + y) % 2 === 0;
      const o = 54 + (n - 1 - y) * row + x * 3;
      bytes[o] = ring ? 40 : 60 + x * 20; // blue
      bytes[o + 1] = ring ? 40 : 120 + y * 14; // green
      bytes[o + 2] = ring ? 245 : 230 - x * 10; // red
    }
  }
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return 'data:image/bmp;base64,' + btoa(bin);
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const url = pixels();

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'side', value: 150, bind: { input: 'range', min: 16, max: 190, step: 1 } }],
    data: [{ name: 'both', values: [{ x: 20, smooth: true, label: 'smooth: true' }, { x: 230, smooth: false, label: 'smooth: false' }] }],
    marks: [
      {
        type: 'image',
        from: { data: 'both' },
        encode: {
          enter: { url: { value: url } },
          update: { x: { field: 'x' }, y: { value: 10 }, width: { signal: 'side' }, height: { signal: 'side' }, smooth: { field: 'smooth' }, aspect: { value: false } },
        },
      },
      { type: 'text', interactive: false, from: { data: 'both' }, encode: { update: { x: { field: 'x' }, y: { signal: 'height - 6' }, text: { field: 'label' } } } },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'side', [150, 40, 110, 190, 70], 1300);
  return () => stage.dispose();
};

export default mount;
