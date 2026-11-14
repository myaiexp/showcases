// A rocket story that stops at the end of each chapter with addPause() until you press Continue
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const CHAPTERS = ['1. Lift off', '2. The long cruise', '3. Touchdown'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="story">
      <div class="sky"><div class="earth"></div><div class="moon"></div><div class="rocket"></div></div>
      <div class="caption"><span class="chapter"></span><button class="btn go" hidden>Continue</button></div>
    </div>`;
  const chapter = el.querySelector<HTMLElement>('.chapter')!;
  const go = el.querySelector<HTMLButtonElement>('.go')!;

  const scope = scopeMotion(el, (s) => {
    let finished = false;
    const timeline = animate(
      [
        ['.rocket', { y: [0, -60], opacity: [0, 1] }, { duration: 1 }],
        'ch1',
        ['.rocket', { x: [0, 110], y: -80, rotate: 70 }, { duration: 1.2 }],
        'ch2',
        ['.rocket', { x: 150, y: -20, scale: 0.5, rotate: 160 }, { duration: 1 }],
        'ch3',
      ],
      { autoplay: false, onComplete: () => s.run(() => delay(restart, preview ? 1.5 : 0)) },
    );
    const restart = (): void => {
      if (!preview) {
        chapter.textContent = 'The end';
        go.textContent = 'Play again';
        go.hidden = false;
        finished = true;
        return;
      }
      timeline.time = 0;
      chapter.textContent = CHAPTERS[0] ?? '';
      timeline.play();
    };

    // The pause stops the playhead at the label and runs the callback, which shows the button.
    ['ch1', 'ch2'].forEach((label, i) => {
      timeline.addPause(label, () => {
        chapter.textContent = `${CHAPTERS[i] ?? ''} done`;
        if (preview) s.run(() => delay(() => resume(i), 1.1));
        else go.hidden = false;
      });
    });
    const resume = (i: number): void => {
      go.hidden = true;
      chapter.textContent = CHAPTERS[i + 1] ?? '';
      timeline.play();
    };
    chapter.textContent = CHAPTERS[0] ?? '';
    let at = 0;
    go.addEventListener('click', s.bind(() => {
      if (!finished) return resume(at++);
      finished = false;
      at = 0;
      go.hidden = true;
      go.textContent = 'Continue';
      chapter.textContent = CHAPTERS[0] ?? '';
      timeline.time = 0;
      timeline.play();
    }));
    if (preview) go.remove();
    else {
      hint(el, 'The rocket flies a chapter, then the timeline pauses itself at a label. Continue plays on to the next pause. After the last chapter the story ends.');
    }
    timeline.play();
  });
  return () => scope.cancel();
};

export default mount;
