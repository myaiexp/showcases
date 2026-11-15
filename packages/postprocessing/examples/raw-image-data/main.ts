// RawImageData: pixels from ImageData or an Image, back to a canvas with toCanvas()
import { RawImageData } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { controlBar, readout } from '../../shared/controls.ts';

const N = 48;
const SCALE = 4;

const mount: Mount = (el, ctx) => {
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:8px;background:#10131a';
  el.append(box);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;justify-content:center';
  box.append(row);

  // A source: ImageData that a 2D canvas context can create, filled with a moving pattern.
  const scratch = document.createElement('canvas').getContext('2d')!;
  const imageData = scratch.createImageData(N, N);
  const paintPlasma = (t: number): void => {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const v = Math.sin(x * 0.3 + t) + Math.sin(y * 0.25 - t * 1.3) + Math.sin((x + y) * 0.15 + t * 0.7);
        const i = (y * N + x) * 4;
        imageData.data[i] = 128 + 60 * v;
        imageData.data[i + 1] = 90 + 70 * Math.sin(v + t * 0.5);
        imageData.data[i + 2] = 200 - 50 * v;
        imageData.data[i + 3] = 255;
      }
    }
  };

  const slot = (title: string): { holder: HTMLDivElement; caption: HTMLDivElement } => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;gap:4px;align-items:center;font:12px ui-monospace,monospace;color:#cdd6e4';
    const holder = document.createElement('div');
    const caption = document.createElement('div');
    caption.textContent = title;
    wrap.append(holder, caption);
    row.append(wrap);
    return { holder, caption };
  };
  const show = (holder: HTMLElement, canvas: HTMLCanvasElement | null): void => {
    if (!canvas) return;
    canvas.style.cssText = `width:${N * SCALE}px;height:${N * SCALE}px;image-rendering:pixelated;display:block`;
    holder.replaceChildren(canvas);
  };

  const fromData = slot('RawImageData.from(imageData).toCanvas()');
  const fromImage = slot('RawImageData.from(image).toCanvas()');
  const direct = slot('new RawImageData(w, h, data) inverted');

  const refresh = (t: number): void => {
    paintPlasma(t);
    // from() keeps a reference to ImageData's own pixel array; toCanvas() copies it into a canvas.
    const raw = RawImageData.from(imageData);
    show(fromData.holder, raw.toCanvas());

    // An RGBA copy with the colours inverted, built with the constructor.
    const inverted = new Uint8ClampedArray(raw.data);
    for (let i = 0; i < inverted.length; i += 4) {
      inverted[i] = 255 - inverted[i]!;
      inverted[i + 1] = 255 - inverted[i + 1]!;
      inverted[i + 2] = 255 - inverted[i + 2]!;
    }
    show(direct.holder, new RawImageData(N, N, inverted).toCanvas());

    // An HTMLImageElement from a data URL (generated in memory, nothing is fetched).
    const source = raw.toCanvas()!;
    const image = new Image();
    image.onload = () => {
      // The typings describe from()'s argument as an Image constructor, but it takes the element.
      show(fromImage.holder, RawImageData.from(image as never).toCanvas());
    };
    image.src = source.toDataURL();
  };
  refresh(0);

  let bar: HTMLElement | null = null;
  if (!ctx.preview) {
    bar = controlBar(box);
    readout(bar, `${N} x ${N} pixels, ${imageData.data.length} bytes of RGBA data`);
  }
  let id = 0;
  let last = 0;
  const tick = (ms: number): void => {
    if (ms - last > 150) {
      last = ms;
      refresh(ms / 1000);
    }
    id = requestAnimationFrame(tick);
  };
  id = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(id);
    bar?.remove();
    box.remove();
  };
};

export default mount;
