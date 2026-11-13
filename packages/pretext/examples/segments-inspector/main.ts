// Shows how prepareWithSegments() splits text: one chip per segment, coloured by its kind, with its measured width
import '@fontsource-variable/inter';
import { prepareWithSegments } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import { SAMPLES, visible } from './data.ts';
import './style.css';

const FONT = '15px "Inter Variable"';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(FONT, SAMPLES.map((s) => s.text).join(''));
  if (signal.aborted) return () => {};

  const chips = document.createElement('div');
  chips.className = 'chips';
  const summary = document.createElement('p');
  summary.className = 'summary';

  const render = (text: string, preWrap: boolean): void => {
    const prepared = prepareWithSegments(text, FONT, preWrap ? { whiteSpace: 'pre-wrap' } : undefined);
    // Three parallel arrays: the text of each segment, its break behaviour, and its width in px.
    const { segments, kinds, widths } = prepared;
    const shown = preview ? Math.min(segments.length, 12) : segments.length;
    const out: HTMLElement[] = [];
    for (let i = 0; i < shown; i++) {
      const chip = document.createElement('div');
      const kindName = kinds[i] ?? 'text';
      chip.className = `chip k-${kindName}`;
      const label = document.createElement('span');
      label.className = 'seg-label';
      label.textContent = visible(segments[i] ?? '');
      const kind = document.createElement('span');
      kind.className = 'seg-kind';
      kind.textContent = kindName;
      const w = document.createElement('span');
      w.className = 'seg-w';
      w.textContent = `${(widths[i] ?? 0).toFixed(1)}px`;
      chip.append(label, kind, w);
      out.push(chip);
    }
    chips.replaceChildren(...out);
    summary.textContent = `${segments.length} segments, ${preWrap ? 'pre-wrap' : 'normal'}`;
  };

  if (preview) {
    const box = document.createElement('div');
    box.style.cssText = 'width:100%;height:196px;overflow:hidden';
    box.append(summary, chips);
    el.append(box);
    let i = 0;
    const step = (): void => {
      const s = SAMPLES[(i >> 1) % SAMPLES.length]!;
      render(s.text, (i & 1) === 1);
      i++;
    };
    step();
    const timer = setInterval(step, 2500);
    return () => clearInterval(timer);
  }

  const select = document.createElement('select');
  SAMPLES.forEach((s, i) => select.append(new Option(s.name, String(i))));
  const preWrap = document.createElement('input');
  preWrap.type = 'checkbox';
  const wrapLabel = document.createElement('label');
  wrapLabel.append(preWrap, " whiteSpace: 'pre-wrap'");
  const editor = document.createElement('textarea');
  editor.rows = 4;
  editor.value = SAMPLES[0]!.text;
  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(select, wrapLabel);
  el.append(controls, editor, summary, chips);

  const update = async (): Promise<void> => {
    const text = editor.value;
    await document.fonts.load(FONT, text);
    if (signal.aborted) return;
    render(text, preWrap.checked);
  };
  const onSelect = (): void => {
    editor.value = SAMPLES[Number(select.value)]!.text;
    void update();
  };
  select.addEventListener('input', onSelect);
  preWrap.addEventListener('input', update);
  editor.addEventListener('input', update);
  void update();
  return () => {
    select.removeEventListener('input', onSelect);
    preWrap.removeEventListener('input', update);
    editor.removeEventListener('input', update);
  };
};

export default mount;
