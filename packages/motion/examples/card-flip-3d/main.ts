// A flashcard that flips over: perspective on the parent, preserve-3d on the card, backface-visibility on the faces
import { animate, delay, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const WORDS = [
  ['Good morning', 'Hyvää huomenta'],
  ['Thank you', 'Kiitos'],
  ['See you soon', 'Nähdään pian'],
] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="scene">
      <div class="card" tabindex="0" role="button" aria-label="Flip card">
        <div class="face front"><small>English</small><b></b></div>
        <div class="face back"><small>Finnish</small><b></b></div>
      </div>
    </div>`;
  el.classList.toggle('is-full', !preview);
  const card = el.querySelector<HTMLElement>('.card')!;
  const front = el.querySelector<HTMLElement>('.front b')!;
  const back = el.querySelector<HTMLElement>('.back b')!;
  let word = 0;
  let flipped = false;
  const show = (): void => {
    front.textContent = WORDS[word % WORDS.length]![0];
    back.textContent = WORDS[word % WORDS.length]![1];
  };
  show();

  let ui: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    const flip = (): void => {
      flipped = !flipped;
      // The whole animation: a spring on rotateY. 0 shows the front, 180 the back.
      animate(card, { rotateY: flipped ? 180 : 0 }, { type: 'spring', visualDuration: 0.6, bounce: 0.25 });
    };
    // press() also makes the card keyboard-accessible (focus, then Enter).
    press(card, () => {
      return (_e, info) => {
        if (info.success) flip();
      };
    });
    if (preview) {
      const tick = (): void => {
        flip();
        // Move on to the next word while the card is face-down, so the front changes unseen.
        if (!flipped) delay(() => { word++; show(); }, 0.7);
        delay(tick, 2);
      };
      delay(tick, 0.8);
    }
  });

  if (!preview) {
    ui = panel(el);
    ui.toggle('backface-visibility: hidden', true, (on) => {
      el.classList.toggle('no-hide', !on);
    });
    ui.button('Next word', () => {
      word++;
      show();
    });
    hint(el, 'Click or press Enter on the card. Switch backface-visibility off and flip it: both faces draw, so you see each one mirrored through the other.');
  }

  return () => {
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
