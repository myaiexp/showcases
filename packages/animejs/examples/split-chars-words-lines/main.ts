// splitText into lines, words or chars, each staggered in through addEffect()
import { animate, splitText, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { button, controlRow, setActive } from './ui.ts';
import './style.css';

const MODES = ['lines', 'words', 'chars'] as const;
type Mode = (typeof MODES)[number];

const TEXT =
  'Every paragraph is a stack of lines, each line a run of words, and each word a string of small letters.';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const stage = document.createElement('div');
  stage.className = 'stage';
  const p = document.createElement('p');
  p.className = 'text';
  p.textContent = TEXT;
  const readout = document.createElement('div');
  readout.className = 'readout';
  stage.append(p);
  el.append(stage);

  let split: ReturnType<typeof splitText> | undefined;

  const show = (mode: Mode): void => {
    split?.revert();
    split = splitText(p, {
      lines: mode === 'lines' ? { wrap: 'clip' } : false,
      words: mode === 'words' ? { wrap: 'clip' } : true,
      chars: mode === 'chars' ? { wrap: 'clip' } : false,
    });
    // Line splits are recomputed on resize, so the animation lives in an effect.
    split.addEffect((self) => {
      readout.textContent = `${self.lines.length} lines · ${self.words.length} words · ${self.chars.length} chars`;
      const pieces = self[mode];
      return animate(pieces, {
        y: ['100%', '0%'],
        duration: 800,
        ease: 'out(3)',
        delay: stagger(mode === 'chars' ? 18 : mode === 'words' ? 90 : 220),
        loop: true,
        loopDelay: 900,
        alternate: true,
      });
    });
  };

  const buttons: HTMLButtonElement[] = [];
  let timer = 0;
  if (preview) {
    let i = 0;
    show(MODES[0]);
    timer = window.setInterval(() => show(MODES[++i % MODES.length]!), 3600);
  } else {
    const row = controlRow(el);
    MODES.forEach((mode, i) =>
      buttons.push(
        button(row, mode, () => {
          setActive(buttons, i);
          show(mode);
        }),
      ),
    );
    el.append(readout);
    setActive(buttons, 1);
    show('words');
  }

  return () => {
    window.clearInterval(timer);
    split?.revert();
    el.replaceChildren();
  };
};

export default mount;
