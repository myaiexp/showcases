// Prepares one text under several setLocale() languages and compares the lines each gives
import '@fontsource-variable/inter';
import { layoutWithLines, prepareWithSegments, setLocale } from '@chenglou/pretext';
import type { LayoutLine, PreparedTextWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { LOCALES, SAMPLES } from './data.ts';
import './style.css';

// CJK text falls through Inter to a named CJK font; list one per script, as the Caveats ask.
const FAMILY = '"Inter Variable", "Noto Sans CJK SC", "Noto Sans CJK JP", "Noto Sans CJK KR", "PingFang SC", "Hiragino Kaku Gothic ProN", "Apple SD Gothic Neo", sans-serif';
const FONT = `16px ${FAMILY}`;
const LINE_HEIGHT = 22;

type Locale = (typeof LOCALES)[number];

// The locale and the caches are global: set, prepare synchronously, then go back to <html lang>.
function prepareUnder(locale: Locale, text: string): PreparedTextWithSegments {
  setLocale(locale);
  try {
    return prepareWithSegments(text, FONT);
  } finally {
    setLocale();
  }
}

function linesUnder(text: string, width: number, locales: readonly Locale[]): Map<Locale, LayoutLine[]> {
  const out = new Map<Locale, LayoutLine[]>();
  for (const locale of locales) {
    out.set(locale, layoutWithLines(prepareUnder(locale, text), width, LINE_HEIGHT).lines);
  }
  return out;
}

const joined = (lines: LayoutLine[]): string => lines.map(l => l.text).join('\n');

const mount: Mount = async (el, { preview, signal }) => {
  const allText = SAMPLES.map(s => s.text).join('');
  await document.fonts.load(FONT, allText);
  if (signal.aborted) return () => {};

  const locales: readonly Locale[] = preview ? ['en', 'zh'] : LOCALES;
  const root = document.createElement('div');
  root.className = 'root';
  const cols = document.createElement('div');
  cols.className = 'cols';
  cols.style.setProperty('--cols', String(locales.length));
  const readout = document.createElement('p');
  readout.className = 'readout';
  const columns = new Map<Locale, HTMLElement>();
  for (const locale of locales) {
    const col = document.createElement('div');
    col.className = 'col';
    const h = document.createElement('h4');
    h.textContent = `setLocale('${locale}')`;
    const box = document.createElement('div');
    box.className = 'lines';
    box.style.font = FONT;
    box.style.lineHeight = `${LINE_HEIGHT}px`;
    col.append(h, box);
    cols.append(col);
    columns.set(locale, box);
  }

  const render = (text: string, width: number): number => {
    const lines = linesUnder(text, width, locales);
    const base = lines.get('en') ?? [];
    let differing = 0;
    for (const [locale, box] of columns) {
      box.style.width = `${width}px`;
      box.replaceChildren();
      const mine = lines.get(locale) ?? [];
      mine.forEach((line, i) => {
        const row = document.createElement('div');
        row.className = 'line';
        row.textContent = line.text;
        if (locale !== 'en' && base[i]?.text !== line.text) row.classList.add('differs');
        box.append(row);
      });
      if (locale !== 'en' && joined(mine) !== joined(base)) differing++;
    }
    return differing;
  };

  if (preview) {
    cols.style.gridTemplateColumns = 'repeat(2, max-content)';
    cols.style.justifyContent = 'center';
    root.append(cols);
    el.append(root);
    const text = (SAMPLES[0]?.text ?? '').slice(0, 26);
    let raf = 0;
    let last = -1;
    const tick = (t: number): void => {
      // Quantise the width to 4px so we only re-lay out when it moves.
      const width = 4 * Math.round((90 + 30 * Math.sin(t / 1200)) / 4);
      if (width !== last) {
        last = width;
        render(text, width);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const select = document.createElement('select');
  SAMPLES.forEach((s, i) => select.add(new Option(s.label, String(i))));
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '60';
  slider.max = '260';
  slider.step = '1';
  slider.value = String(SAMPLES[0]?.width ?? 160);
  const widthLabel = document.createElement('span');
  controls.append(select, slider, widthLabel);
  root.append(controls, readout, cols);
  el.append(root);

  const update = (): void => {
    const text = SAMPLES[Number(select.value)]?.text ?? '';
    const width = Number(slider.value);
    widthLabel.textContent = `${width}px wide`;
    const differing = render(text, width);
    // Scan every width so we can say where this browser differs, if anywhere.
    const hits: number[] = [];
    for (let w = 60; w <= 260; w += 2) {
      const l = linesUnder(text, w, ['en', ...locales.filter(x => x !== 'en')]);
      const base = joined(l.get('en') ?? []);
      if ([...l].some(([k, v]) => k !== 'en' && joined(v) !== base)) hits.push(w);
    }
    const here = differing
      ? `${differing} of ${locales.length - 1} other locales break differently from en at ${width}px.`
      : `All four locales break the same at ${width}px.`;
    const scan = hits.length
      ? `Widths 60-260px that differ: ${hits.length} (first: ${hits.slice(0, 6).join(', ')}px).`
      : 'No width from 60 to 260px differs in this browser: it gives the same lines under every locale for this text.';
    readout.textContent = `${here} ${scan}`;
  };
  const onSample = (): void => {
    slider.value = String(SAMPLES[Number(select.value)]?.width ?? 160);
    update();
  };
  select.addEventListener('change', onSample);
  slider.addEventListener('input', update);
  update();
  return () => {
    select.removeEventListener('change', onSample);
    slider.removeEventListener('input', update);
  };
};

export default mount;
