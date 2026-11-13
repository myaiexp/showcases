// Resolves a root-relative CSS font size to whole px once per change, then prepares with that string
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { PreparedText } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

const FULL_TEXT =
  'Sizes in rem or em must become px before Pretext sees them: resolve once when the root size changes, and pass the whole-pixel string.';
const SHORT_TEXT = 'Resolve rem to px once per change.';
const FAMILY = '"Inter Variable"';
const FACTOR = 1.25; // the text's CSS size: 1.25 root units

const mount: Mount = async (el, { preview, signal }) => {
  const TEXT = preview ? SHORT_TEXT : FULL_TEXT;
  await document.fonts.load(`16px ${FAMILY}`, TEXT);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const readout = document.createElement('p');
  readout.className = 'readout';

  // The page's <html> font-size is not ours to change, so this scope stands in for it: the text's
  // size is 1.25em of the scope, resolved exactly as 1.25rem would be against <html>.
  const scope = document.createElement('div');
  scope.className = 'scope';
  const makeBox = (caption: string): { box: HTMLElement; para: HTMLElement; predicted: HTMLElement } => {
    const tag = document.createElement('p');
    tag.className = 'tag';
    tag.textContent = caption;
    const box = document.createElement('div');
    box.className = 'box';
    const predicted = document.createElement('div');
    predicted.className = 'predicted';
    const para = document.createElement('p');
    para.className = 'para';
    para.textContent = TEXT;
    box.append(predicted, para);
    if (!preview) scope.append(tag);
    scope.append(box);
    return { box, para, predicted };
  };
  const rounded = makeBox('painted at the whole-px size Pretext was given');
  const raw = preview ? null : makeBox('painted at the raw fractional CSS size (for contrast)');
  rounded.para.style.fontFamily = FAMILY;
  if (raw) raw.para.style.fontFamily = FAMILY;
  // The raw paragraph keeps the CSS size as written.
  if (raw) raw.para.style.fontSize = `${FACTOR}em`;
  const sizer = document.createElement('span');
  sizer.style.cssText = `font-size:${FACTOR}em;position:absolute;visibility:hidden`;
  sizer.textContent = 'x';
  scope.append(sizer);

  let prepared: PreparedText | null = null;
  let prepareRuns = 0;
  let layoutRuns = 0;
  let rootPx = 16;
  let width = preview ? 230 : 340;
  let lineHeight = 24;

  // Runs only when the root size changes.
  const onRootChange = (px: number): void => {
    rootPx = px;
    scope.style.fontSize = `${px}px`;
    // getComputedStyle gives the resolved size in px, e.g. "16.875px".
    const computed = parseFloat(getComputedStyle(sizer).fontSize);
    const whole = Math.round(computed);
    const font = `${whole}px ${FAMILY}`;
    lineHeight = Math.round(whole * 1.5);
    rounded.para.style.fontSize = `${whole}px`;
    rounded.para.style.lineHeight = `${lineHeight}px`;
    if (raw) raw.para.style.lineHeight = `${lineHeight}px`;
    prepared = prepare(TEXT, font);
    prepareRuns++;
    readout.dataset.computed = String(computed);
    readout.dataset.font = font;
    paint();
  };

  // Runs on every width change: layout() only.
  function paint(): void {
    if (!prepared) return;
    layoutRuns++;
    const { height, lineCount } = layout(prepared, width, lineHeight);
    for (const b of raw ? [rounded, raw] : [rounded]) {
      b.para.style.width = `${width}px`;
      b.predicted.style.width = `${width}px`;
      b.predicted.style.height = `${height}px`;
    }
    const domRounded = rounded.para.getBoundingClientRect().height;
    const lines = [
      `root ${rootPx}px × ${FACTOR} = ${readout.dataset.computed}px computed → font "${readout.dataset.font}"`,
      `layout(): ${lineCount} lines, ${height}px · DOM at whole px: ${domRounded}px`,
    ];
    if (raw) lines.push(`DOM at the raw size: ${raw.para.getBoundingClientRect().height}px (the line height is the same)`);
    lines.push(`prepare() ran ${prepareRuns}×, layout() ${layoutRuns}×`);
    readout.textContent = (preview ? lines.slice(0, 2) : lines).join('\n');
  }

  if (preview) {
    root.append(scope, readout);
    el.append(root);
    readout.style.fontSize = '11px';
    let raf = 0;
    let last = 0;
    const tick = (t: number): void => {
      const px = Math.round((17 + 4 * Math.sin(t / 1400)) * 2) / 2;
      if (px !== last) {
        last = px;
        onRootChange(px);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const controls = document.createElement('div');
  controls.className = 'controls';
  const rootSlider = document.createElement('input');
  rootSlider.type = 'range';
  rootSlider.min = '12';
  rootSlider.max = '24';
  rootSlider.step = '0.5';
  rootSlider.value = '13.5';
  const widthSlider = document.createElement('input');
  widthSlider.type = 'range';
  widthSlider.min = '120';
  widthSlider.max = '520';
  widthSlider.value = String(width);
  const l1 = document.createElement('span');
  l1.textContent = 'root size';
  const l2 = document.createElement('span');
  l2.textContent = 'width';
  const v1 = document.createElement('span');
  const v2 = document.createElement('span');
  controls.append(l1, rootSlider, v1, l2, widthSlider, v2);
  root.append(controls, readout, scope);
  el.append(root);
  const onRoot = (): void => {
    v1.textContent = `${rootSlider.value}px`;
    onRootChange(Number(rootSlider.value));
  };
  const onWidth = (): void => {
    width = Number(widthSlider.value);
    v2.textContent = `${width}px`;
    paint();
  };
  rootSlider.addEventListener('input', onRoot);
  widthSlider.addEventListener('input', onWidth);
  onWidth();
  onRoot();
  return () => {
    rootSlider.removeEventListener('input', onRoot);
    widthSlider.removeEventListener('input', onWidth);
  };
};

export default mount;
