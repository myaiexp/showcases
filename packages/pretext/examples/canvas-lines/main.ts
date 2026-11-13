// Lays a paragraph out with layoutWithLines() and paints each line with ctx.fillText
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '17px "Inter Variable"';
const LINE_HEIGHT = 26;
const PAD = 8;
const TEXT =
  'Pretext hands back every line as a string with its measured width. Painting them is one fillText call per line: no DOM, no reflow. AGI 春天到了. بدأت الرحلة 🚀';

const mount: Mount = async (el, { preview, signal }) => {
  // The 200px preview card paints only the first sentence.
  const text = preview ? TEXT.split('. ')[0] + '.' : TEXT;
  await document.fonts.load(FONT, TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const canvas = document.createElement('canvas');
  const readout = document.createElement('p');
  readout.className = 'readout';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '520';
  slider.value = '300';
  if (preview) root.append(canvas);
  else root.append(slider, readout, canvas);
  el.append(root);

  const style = getComputedStyle(el);
  const fg = style.getPropertyValue('--fg-1').trim() || '#ddd';
  const accent = style.getPropertyValue('--accent').trim() || '#6af';
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // One-time work. Only the width changes while the slider moves.
  const prepared = prepareWithSegments(text, FONT);

  const draw = (maxWidth: number): void => {
    const { lines, height } = layoutWithLines(prepared, maxWidth, LINE_HEIGHT);
    const cssW = maxWidth + PAD * 2;
    const cssH = height + PAD * 2;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // The maxWidth guide.
    ctx.strokeStyle = accent;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(PAD + 0.5, PAD + 0.5, maxWidth, height);
    ctx.setLineDash([]);

    ctx.font = FONT;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fg;
    lines.forEach((line, i) => ctx.fillText(line.text, PAD, PAD + i * LINE_HEIGHT + LINE_HEIGHT / 2));
    readout.textContent = `maxWidth ${maxWidth}px → ${lines.length} lines, ${height}px tall`;
  };

  if (preview) {
    let raf = 0;
    const tick = (t: number): void => {
      draw(Math.round(130 + 90 * (0.5 + 0.5 * Math.sin(t / 900))));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const onInput = (): void => draw(Number(slider.value));
  slider.addEventListener('input', onInput);
  onInput();
  return () => slider.removeEventListener('input', onInput);
};

export default mount;
