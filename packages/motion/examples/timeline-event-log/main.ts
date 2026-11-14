// A looping animation next to a live log of onUpdate, onRepeat, onComplete and onReverseComplete
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="monitor">
      <div class="lane"><div class="ball"></div></div>
      <div class="time">time <code>0.00</code>s</div>
      <ul class="log"></ul>
    </div>`;
  const log = el.querySelector<HTMLElement>('.log')!;
  const time = el.querySelector<HTMLElement>('.time code')!;
  const say = (text: string): void => {
    const li = document.createElement('li');
    li.textContent = text;
    log.prepend(li);
    while (log.children.length > (preview ? 3 : 7)) log.lastElementChild?.remove();
  };

  const scope = scopeMotion(el, (s) => {
    const timeline = animate(
      [
        ['.ball', { x: [0, 150], rotate: [0, 180] }, { duration: 0.8 }],
        ['.ball', { x: 0, rotate: 360 }, { duration: 0.8 }],
      ],
      {
        autoplay: false,
        repeat: 1,
        onUpdate: (t) => {
          time.textContent = t.toFixed(2);
        },
        onRepeat: () => say('onRepeat: starting repeat 2'),
        onComplete: () => {
          say('onComplete: finished forwards');
          if (preview) s.run(() => delay(() => timeline.reverse(), 0.8));
        },
        onReverseComplete: () => {
          say('onReverseComplete: back at the start');
          if (preview) s.run(() => delay(() => timeline.reverse(), 0.8));
        },
      },
    );
    if (preview) {
      delay(() => timeline.play(), 0.4);
      return;
    }
    const p = panel(el);
    p.button('Play', () => {
      timeline.speed = Math.abs(timeline.speed);
      timeline.time = 0;
      timeline.play();
    });
    p.button('Reverse', () => {
      if (timeline.progress === 0) timeline.progress = 1;
      timeline.reverse();
    });
    hint(el, 'The ball plays twice (repeat: 1). Play it forwards, then press Reverse and watch onReverseComplete take the place of onComplete. onUpdate feeds the time readout every frame.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
