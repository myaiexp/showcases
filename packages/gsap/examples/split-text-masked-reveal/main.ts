// SplitText: mask lines for a reveal, with autoSplit re-splitting as the width changes
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(SplitText);

const COPY =
  'Masking wraps every line in a clipping element, so each line can slide up from nothing. Resize the box and the lines re-split.';

const PREVIEW_COPY = 'Each line is masked, then slides up from nothing.';

const mount: Mount = (el, { preview }) => {
  const box = document.createElement('div');
  box.className = 'box';
  const text = document.createElement('p');
  text.className = 'text';
  text.textContent = preview ? PREVIEW_COPY : COPY;
  if (preview) text.classList.add('compact');
  box.append(text);
  el.append(box);

  const readout = document.createElement('p');
  readout.className = 'readout';
  let reveal: gsap.core.Tween | undefined;

  const ctx = gsap.context(() => {
    SplitText.create(text, {
      type: 'words,lines',
      mask: 'lines',
      linesClass: 'line',
      autoSplit: true,
      onSplit(self) {
        // A returned animation is reverted and time-synced on every re-split.
        reveal = gsap.from(self.lines, { yPercent: 100, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'expo.out' });
        readout.textContent = `onSplit: ${self.lines.length} lines, ${self.masks.length} masks`;
        return reveal;
      },
    });
  }, el);

  let timer = 0;
  const replay = (): void => {
    reveal?.timeScale(preview ? 1 : 0.4).play(0);
  };
  if (preview) {
    timer = window.setInterval(replay, 3200);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay slowly';
    btn.addEventListener('click', replay);
    const label = document.createElement('label');
    label.textContent = 'Width ';
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '160';
    range.max = '480';
    range.value = '420';
    const onInput = (): void => {
      box.style.width = `${range.value}px`;
    };
    range.addEventListener('input', onInput);
    onInput();
    label.append(range);
    bar.append(btn, label);
    el.append(bar, readout);
  }

  return () => {
    window.clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
