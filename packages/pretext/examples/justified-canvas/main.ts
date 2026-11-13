// Justifies a paragraph on canvas by spreading each line's slack over its space segments
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments } from '@chenglou/pretext';
import type { LayoutLine, PreparedTextWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FONT = '16px "Inter Variable"';
const LINE_HEIGHT = 24;
const PAD = 8;
const TEXT =
  'Justified text spreads the leftover room of every line across its spaces, so both edges come out straight. Pretext gives each line a start and an end cursor, and the prepared handle lists every segment between them with its kind and width. Supercalifragilisticexpialidocious stays whole until a line is too narrow for it.';

// The segments of a line as [text, width, kind] runs, or null when the line can't be
// justified safely: it starts or ends mid-segment, or holds a kind other than text and space.
const lineRuns = (p: PreparedTextWithSegments, line: LayoutLine): { text: string; width: number; space: boolean }[] | null => {
  if (line.start.graphemeIndex > 0 || line.end.graphemeIndex > 0) return null;
  const runs: { text: string; width: number; space: boolean }[] = [];
  for (let i = line.start.segmentIndex; i < line.end.segmentIndex; i++) {
    const kind = p.kinds[i];
    if (kind !== 'text' && kind !== 'space') return null;
    runs.push({ text: p.segments[i] ?? '', width: p.widths[i] ?? 0, space: kind === 'space' });
  }
  // A space that ends the line hangs past it: line.width leaves it out.
  while (runs.at(-1)?.space) runs.pop();
  return runs;
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
  slider.min = '120';
  slider.max = '560';
  slider.value = '360';
  const canvas = document.createElement('canvas');
  if (preview) root.append(canvas);
  else root.append(slider, readout, canvas);
  el.append(root);

  const style = getComputedStyle(el);
  const fg = style.getPropertyValue('--fg-1').trim() || '#ddd';
  const accent = style.getPropertyValue('--accent').trim() || '#6af';
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const prepared = prepareWithSegments(text, FONT);

  const draw = (maxWidth: number): void => {
    const { lines, height } = layoutWithLines(prepared, maxWidth, LINE_HEIGHT);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round((maxWidth + PAD * 2) * dpr);
    canvas.height = Math.round((height + PAD * 2) * dpr);
    canvas.style.width = `${maxWidth + PAD * 2}px`;
    canvas.style.height = `${height + PAD * 2}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.strokeStyle = accent;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(PAD + 0.5, PAD + 0.5, maxWidth, height);
    ctx.setLineDash([]);
    ctx.font = FONT;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fg;

    let justified = 0;
    let fallback = 0;
    lines.forEach((line, i) => {
      const y = PAD + i * LINE_HEIGHT + LINE_HEIGHT / 2;
      const runs = lineRuns(prepared, line);
      const gaps = runs ? runs.filter((r) => r.space).length : 0;
      const isLast = i === lines.length - 1;
      if (!runs || gaps === 0 || isLast) {
        // Last line, a one-word line, or a line with an unsafe cursor: left-aligned.
        ctx.fillText(line.text, PAD, y);
        if (!isLast) fallback++;
        return;
      }
      // The slack comes from line.width, not from the sum of segment widths.
      const extra = (maxWidth - line.width) / gaps;
      let x = PAD;
      for (const run of runs) {
        if (!run.space) ctx.fillText(run.text, x, y);
        x += run.width + (run.space ? extra : 0);
      }
      justified++;
    });
    readout.textContent = `maxWidth ${maxWidth}px → ${lines.length} lines: ${justified} justified, ${fallback} left-aligned fallback (+ the last line)`;
  };

  if (preview) {
    let raf = 0;
    const tick = (t: number): void => {
      draw(Math.round(170 + 70 * (0.5 + 0.5 * Math.sin(t / 1200))));
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
