// scrambleText reveal direction (from, reversed) with an onChange readout
import { animate, scrambleText } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, setActive } from './ui.ts';
import './style.css';

type From = 'left' | 'center' | 'right' | 'random' | number;
const FROMS: From[] = ['left', 'center', 'right', 'random', 6];
const TEXTS = ['Reveal me from anywhere.', 'Another line, another wave.', 'Ending where it began.'];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = TEXTS[0] ?? null;
  stage.append(p);
  el.append(stage);

  const readout = document.createElement('div');
  readout.className = 'readout';
  let from: From = 'center';
  let reversed = false;
  let textIndex = 0;
  let changes = 0;
  let anim: ReturnType<typeof animate> | undefined;

  const play = (): void => {
    anim?.revert();
    changes = 0;
    textIndex = (textIndex + 1) % TEXTS.length;
    anim = animate(p, {
      innerHTML: scrambleText({
        text: TEXTS[textIndex]!,
        from,
        reversed,
        cursor: '_',
        revealRate: 30,
        onChange: (value: string, progress: number) => {
          changes += 1;
          if (!preview) readout.textContent = `onChange #${changes}\nprogress ${progress.toFixed(2)}\n"${value}"`;
        },
      }),
    });
  };

  let timer = 0;
  const buttons: HTMLButtonElement[] = [];
  if (preview) {
    let n = 0;
    play();
    timer = window.setInterval(() => {
      n += 1;
      from = FROMS[n % 4]!;
      reversed = n % 3 === 0;
      play();
    }, 3200);
  } else {
    const row = controlRow(el);
    FROMS.forEach((f, i) =>
      buttons.push(
        button(row, `from: ${typeof f === 'number' ? f : `'${f}'`}`, () => {
          from = f;
          setActive(buttons, i);
          play();
        }),
      ),
    );
    const row2 = controlRow(el);
    const rev = button(row2, 'reversed: false', () => {
      reversed = !reversed;
      rev.textContent = `reversed: ${reversed}`;
      play();
    });
    setActive(buttons, 1);
    el.append(readout);
    play();
  }

  return () => {
    window.clearInterval(timer);
    anim?.revert();
  };
};

export default mount;
