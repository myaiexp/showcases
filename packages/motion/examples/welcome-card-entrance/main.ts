// An onboarding card that scales in, with duration, delay, ease and repeat as options
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const EASES = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'circIn', 'circOut', 'circInOut', 'backOut', 'anticipate'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="welcome">
      <div class="avatar">A</div>
      <h3>Welcome aboard</h3>
      <p>Three quick steps and your workspace is ready.</p>
      <button class="btn" tabindex="-1">Get started</button>
    </div>`;

  const opts = { duration: 1.2, delay: 0, repeat: 0, ease: 'circInOut' as (typeof EASES)[number] };
  let current: { stop: () => void } | undefined;

  const scope = scopeMotion(el, () => {
    const play = (): void => {
      current?.stop();
      // The quick-start recipe: scale [0.4, 1] with a named ease and a duration.
      current = animate('.welcome', { scale: [0.4, 1], opacity: [0, 1] }, {
        ease: opts.ease,
        duration: opts.duration,
        delay: opts.delay,
        repeat: opts.repeat,
      });
    };
    play();

    if (preview) {
      const tick = (): void => {
        play();
        delay(tick, 3);
      };
      delay(tick, 3);
      return;
    }
    const p = panel(el);
    p.slider('duration', { min: 0.2, max: 3, step: 0.1, value: opts.duration }, (v) => { opts.duration = v; play(); });
    p.slider('delay', { min: 0, max: 2, step: 0.1, value: opts.delay }, (v) => { opts.delay = v; play(); });
    p.slider('repeat', { min: 0, max: 4, step: 1, value: opts.repeat }, (v) => { opts.repeat = v; play(); });
    p.select('ease', EASES, opts.ease, (v) => { opts.ease = v; play(); });
    p.button('Replay', play);
    hint(el, 'Try circInOut against backOut, then add a delay or a repeat. Each change replays the entrance.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
