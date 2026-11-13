// Paints layoutWithLines() output as SVG <text> elements, with each line's measured width as a bar
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '17px "Inter Variable"';
const LINE_HEIGHT = 26;
const PAD = 8;
const NS = 'http://www.w3.org/2000/svg';
const TEXT =
  'Every line Pretext returns carries its own width. Here that width is the thin bar under the line, and the text is an SVG element per line. AGI 春天到了. بدأت الرحلة 🚀';

const svgEl = <K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string>): SVGElementTagNameMap[K] => {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};

const mount: Mount = async (el, { preview, signal }) => {
  // The 200px preview card paints only the first sentence.
  const text = preview ? TEXT.split('. ')[0] + '.' : TEXT;
  await document.fonts.load(FONT, TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '520';
  slider.value = '300';
  const svg = svgEl('svg', {});
  if (preview) root.append(svg);
  else root.append(slider, readout, svg);
  el.append(root);

  const prepared = prepareWithSegments(text, FONT);

  const draw = (maxWidth: number): void => {
    const { lines, height } = layoutWithLines(prepared, maxWidth, LINE_HEIGHT);
    svg.replaceChildren();
    svg.setAttribute('width', String(maxWidth + PAD * 2));
    svg.setAttribute('height', String(height + PAD * 2));
    svg.append(
      svgEl('rect', {
        x: String(PAD),
        y: String(PAD),
        width: String(maxWidth),
        height: String(height),
        class: 'guide',
      }),
    );
    lines.forEach((line, i) => {
      const top = PAD + i * LINE_HEIGHT;
      const text = svgEl('text', {
        x: String(PAD),
        y: String(top + LINE_HEIGHT / 2),
        'dominant-baseline': 'central',
        class: 'line',
      });
      text.style.font = FONT;
      text.textContent = line.text;
      svg.append(
        text,
        svgEl('rect', {
          x: String(PAD),
          y: String(top + LINE_HEIGHT - 4),
          width: String(line.width),
          height: '2',
          class: 'bar',
        }),
      );
    });
    readout.textContent = `maxWidth ${maxWidth}px → ${lines.length} lines; widths ${lines
      .map((l) => l.width.toFixed(1))
      .join(', ')}`;
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
