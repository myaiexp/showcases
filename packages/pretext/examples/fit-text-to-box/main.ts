// Finds the largest whole-pixel font size whose layout() height fits a box, by searching sizes
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FAMILY = '"Inter Variable"';
const MIN_SIZE = 8;
const MAX_SIZE = 160;
const TEXT = 'Fit this sentence to whatever box it is given.';

const fontFor = (size: number): string => `600 ${size}px ${FAMILY}`;
const lineHeightFor = (size: number): number => Math.round(size * 1.2);

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(fontFor(16), TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const box = document.createElement('div');
  box.className = 'box';
  const para = document.createElement('div');
  para.className = 'para';
  box.append(para);

  let text = TEXT;
  // A font change means a new prepare(), so each size is prepared once and kept for this text.
  let cache = new Map<number, PreparedText>();
  const heightAt = (size: number, width: number): number => {
    let p = cache.get(size);
    if (!p) {
      p = prepare(text, fontFor(size));
      cache.set(size, p);
    }
    return layout(p, width, lineHeightFor(size)).height;
  };

  // Height only grows with size, so binary search the largest size whose height fits.
  const fit = (width: number, height: number): number => {
    let lo = MIN_SIZE;
    let hi = MAX_SIZE;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (heightAt(mid, width) <= height) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };

  const render = (width: number, height: number): void => {
    const size = fit(width, height);
    box.style.width = `${width}px`;
    box.style.height = `${height}px`;
    para.style.font = fontFor(size);
    para.style.lineHeight = `${lineHeightFor(size)}px`;
    para.textContent = text;
    readout.textContent = `box ${width}×${height}px → ${size}px type, ${heightAt(size, width)}px of text`;
  };

  if (preview) {
    root.append(box);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      render(Math.round(150 + 90 * Math.sin(t / 1400)), Math.round(100 + 40 * Math.sin(t / 2100 + 1)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const slider = (min: number, max: number, value: number): HTMLInputElement => {
    const input = document.createElement('input');
    input.type = 'range';
    input.min = String(min);
    input.max = String(max);
    input.value = String(value);
    return input;
  };
  const wSlider = slider(60, 560, 320);
  const hSlider = slider(30, 360, 140);
  const editor = document.createElement('textarea');
  editor.rows = 2;
  editor.value = text;
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(wSlider, hSlider, editor);
  root.append(controls, readout, box);
  el.append(root);

  const onSize = (): void => render(Number(wSlider.value), Number(hSlider.value));
  const onText = (): void => {
    text = editor.value;
    cache = new Map();
    onSize();
  };
  wSlider.addEventListener('input', onSize);
  hSlider.addEventListener('input', onSize);
  editor.addEventListener('input', onText);
  onSize();
  return () => {
    wSlider.removeEventListener('input', onSize);
    hSlider.removeEventListener('input', onSize);
    editor.removeEventListener('input', onText);
  };
};

export default mount;
