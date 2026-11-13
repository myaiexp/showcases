// Prepares before a web font loads, then shows the stale handle and the clearCache() fix
import interUrl from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import { clearCache, layout, prepare } from '@chenglou/pretext';
import type { PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const SIZE = 18;
const LINE_HEIGHT = 24;
const TEXT =
  'Widths measured before the font arrives belong to the fallback font, so this paragraph wraps in the wrong places.';
const STEPS = [
  'Ready. The font family below is not registered yet.',
  '1. prepare() runs now, before the font loads: the handle holds fallback widths.',
  '2. The FontFace is added to document.fonts and loaded, and the paragraph paints in it.',
  '3. Prepared again without clearCache(): the cache may still hold the fallback widths.',
  '4. clearCache(), then prepare() again: the widths are the loaded font\'s.',
];

let counter = 0;
// Cache entries are keyed by font string, so every run uses a family name nothing has measured.
const freshFamily = (): string => `Demo Inter ${Date.now().toString(36)}-${counter++}`;

const mount: Mount = (el, { preview, signal }) => {
  const root = document.createElement('div');
  root.className = 'root';
  const caption = document.createElement('p');
  caption.className = 'step';
  const stage = document.createElement('div');
  stage.className = 'stage';
  const para = document.createElement('p');
  para.className = 'para';
  para.style.lineHeight = `${LINE_HEIGHT}px`;
  stage.append(para);
  const rows = document.createElement('div');
  rows.className = 'rows';
  const width = preview ? 190 : 340;
  para.style.width = `${width}px`;
  const next = document.createElement('button');
  const reset = document.createElement('button');
  const controls = document.createElement('div');
  controls.className = 'controls';
  next.textContent = 'Next step';
  reset.textContent = 'Start over';
  controls.append(next, reset);
  root.append(caption, stage, rows);
  if (!preview) root.prepend(controls);
  el.append(root);

  let family = '';
  let font = '';
  let step = 0;
  let busy = false;
  let stale: PreparedText | null = null;
  let timer = 0;

  const addRow = (label: string, p: PreparedText | null): void => {
    const dom = para.getBoundingClientRect().height;
    const cells = [label, '', ''];
    const cls = ['', 'pending', 'pending'];
    if (p) {
      const r = layout(p, width, LINE_HEIGHT);
      cells[1] = `${r.lineCount} lines, ${r.height}px`;
      cells[2] = r.height === dom ? 'matches' : `DOM ${dom}px`;
      cls[2] = r.height === dom ? 'ok' : 'bad';
      cls[1] = '';
    }
    cells.forEach((c, i) => {
      const s = document.createElement('span');
      s.textContent = c;
      if (cls[i]) s.className = cls[i];
      rows.append(s);
    });
  };

  const advance = async (): Promise<void> => {
    if (busy || signal.aborted) return;
    busy = true;
    step = step === STEPS.length - 1 ? 1 : step + 1;
    caption.textContent = STEPS[step] ?? '';
    if (step === 1) {
      rows.replaceChildren();
      para.replaceChildren();
      para.style.font = '';
      para.style.lineHeight = `${LINE_HEIGHT}px`;
      family = freshFamily();
      font = `${SIZE}px "${family}"`;
      // The family isn't registered, so canvas measures this text in a fallback font.
      stale = prepare(TEXT, font);
    } else if (step === 2) {
      // Add the FontFace to document.fonts, then wait for it: only now are real widths available.
      const face = new FontFace(family, `url(${interUrl})`, { weight: '100 900' });
      document.fonts.add(face);
      await face.load();
      await document.fonts.load(font, TEXT);
      if (signal.aborted) return;
      para.style.font = font;
      para.style.lineHeight = `${LINE_HEIGHT}px`; // the font shorthand resets line-height
      para.textContent = TEXT;
      addRow('old handle', stale);
    } else if (step === 3) {
      addRow('again, no clear', prepare(TEXT, font));
    } else {
      clearCache();
      addRow('clearCache() + new', prepare(TEXT, font));
    }
    busy = false;
  };

  if (preview) {
    void advance();
    timer = window.setInterval(() => void advance(), 1700);
  } else {
    caption.textContent = STEPS[0] ?? '';
    const onNext = (): void => void advance();
    const onReset = (): void => {
      step = 0;
      void advance();
    };
    next.addEventListener('click', onNext);
    reset.addEventListener('click', onReset);
  }
  return () => {
    clearInterval(timer);
  };
};

export default mount;
