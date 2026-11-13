// Lays out CJK text with the default word-break and with { wordBreak: 'keep-all' }, side by side
import '@fontsource-variable/inter';
import { layout, prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { SAMPLES } from './data.ts';
import './style.css';

// Inter has no CJK glyphs; a named CJK font follows it so measuring and painting use the same face.
const FONT = '15px "Inter Variable", "Noto Sans CJK KR", sans-serif';
const LINE_HEIGHT = 24;

type Panel = { render: (width: number, check: boolean) => void };

const mount: Mount = async (el, { preview, signal }) => {
  const all = Object.values(SAMPLES).join('');
  await document.fonts.load(FONT, all);
  if (signal.aborted) return () => {};

  const root = document.createElement('div');
  root.className = 'root';
  const panels = document.createElement('div');
  panels.className = 'panels';
  let text = SAMPLES.Korean ?? '';

  const makePanel = (label: string, keepAll: boolean): Panel => {
    const box = document.createElement('div');
    box.className = 'panel';
    const head = document.createElement('p');
    head.className = 'readout';
    const para = document.createElement('p');
    para.className = 'para';
    para.style.font = FONT;
    para.style.lineHeight = `${LINE_HEIGHT}px`;
    // The painted element carries the CSS the option mirrors.
    para.style.wordBreak = keepAll ? 'keep-all' : 'normal';
    box.append(head, para);
    panels.append(box);
    return {
      render: (width, check) => {
        const prepared = prepare(text, FONT, keepAll ? { wordBreak: 'keep-all' } : undefined);
        const { lineCount, height } = layout(prepared, width, LINE_HEIGHT);
        para.textContent = text;
        para.style.width = `${width}px`;
        let line = `${label}: ${lineCount} lines, ${height}px`;
        if (check) line += para.getBoundingClientRect().height === height ? ' · DOM agrees' : ' · DOM differs';
        head.textContent = line;
      },
    };
  };
  const normal = makePanel('word-break: normal', false);
  const keep = makePanel('keep-all', true);
  const renderBoth = (width: number, check: boolean): void => {
    normal.render(width, check);
    keep.render(width, check);
  };

  if (preview) {
    root.classList.add('preview');
    root.append(panels);
    el.append(root);
    let raf = 0;
    const tick = (t: number): void => {
      renderBoth(Math.round(90 + 36 * (0.5 + 0.5 * Math.sin(t / 1200))), false);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }

  const select = document.createElement('select');
  for (const name of Object.keys(SAMPLES)) select.append(new Option(name, name));
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '80';
  slider.max = '320';
  slider.value = '200';
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(select, slider);
  root.append(controls, panels);
  el.append(root);
  const onInput = (): void => {
    text = SAMPLES[select.value] ?? '';
    renderBoth(Number(slider.value), true);
  };
  select.addEventListener('input', onInput);
  slider.addEventListener('input', onInput);
  onInput();
  return () => {
    select.removeEventListener('input', onInput);
    slider.removeEventListener('input', onInput);
  };
};

export default mount;
