// scrambleText with a chosen glyph set and cursor, replayed on demand
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, setActive } from './ui.ts';
import './style.css';

const CHARS = ['uppercase', 'numbers', 'braille', 'blocks', 'shades', 'symbols'];
const CURSORS: Array<{ label: string; value: string | boolean }> = [
  { label: 'none', value: '' },
  { label: '_', value: true },
  { label: '░▒▓█', value: '░▒▓█' },
];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = 'Signal acquired. Decoding the transmission one glyph at a time.';
  stage.append(p);
  el.append(stage);

  let chars = CHARS[0]!;
  let cursor = CURSORS[1]!;
  let anim: ReturnType<typeof animate> | undefined;
  const play = (): void => {
    anim?.revert();
    anim = animate(p, { innerHTML: scrambleText({ chars, cursor: cursor.value }) });
  };

  let timer = 0;
  const charButtons: HTMLButtonElement[] = [];
  const cursorButtons: HTMLButtonElement[] = [];
  if (preview) {
    let n = 0;
    play();
    timer = window.setInterval(() => {
      n += 1;
      chars = CHARS[n % CHARS.length]!;
      cursor = CURSORS[n % CURSORS.length]!;
      play();
    }, 3500);
  } else {
    const charRow = controlRow(el);
    CHARS.forEach((name, i) =>
      charButtons.push(
        button(charRow, `chars: ${name}`, () => {
          chars = name;
          setActive(charButtons, i);
          play();
        }),
      ),
    );
    const cursorRow = controlRow(el);
    CURSORS.forEach((c, i) =>
      cursorButtons.push(
        button(cursorRow, `cursor: ${c.label}`, () => {
          cursor = c;
          setActive(cursorButtons, i);
          play();
        }),
      ),
    );
    setActive(charButtons, 0);
    setActive(cursorButtons, 1);
    play();
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
    el.replaceChildren();
  };
};

export default mount;
