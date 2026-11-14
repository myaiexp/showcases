// A dropdown menu: the panel opens, then its items stagger in, all as one reversible timeline
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const ITEMS = ['Profile', 'Billing', 'Team', 'Sign out'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="menu">
      <button class="trigger">Account</button>
      <ul class="panel">${ITEMS.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>`;
  const trigger = el.querySelector<HTMLElement>('.trigger')!;

  const scope = scopeMotion(el, (s) => {
    let open = false;
    let timeline: ReturnType<typeof animate>;
    let gap = 0.06;

    const build = (): void => {
      const wasOpen = open;
      timeline?.cancel();
      timeline = animate(
        [
          ['.panel', { opacity: [0, 1], scaleY: [0.4, 1], y: [-8, 0] }, { duration: 0.25 }],
          // delay: stagger() spreads the items out; the timeline ends after the last one.
          ['li', { opacity: [0, 1], x: [-14, 0] }, { duration: 0.25, delay: stagger(gap) }],
        ],
        { autoplay: false },
      );
      if (wasOpen) timeline.time = timeline.duration;
    };
    const toggle = (): void => {
      open = !open;
      trigger.setAttribute('aria-expanded', String(open));
      // playTo plays forwards or backwards to a time, then pauses there.
      timeline.playTo(open ? timeline.duration : 0);
    };
    build();
    trigger.addEventListener('click', s.bind(toggle));

    if (preview) {
      const tick = (): void => {
        toggle();
        delay(tick, open ? 2.2 : 1);
      };
      delay(tick, 0.6);
      return;
    }
    const p = panel(el);
    p.slider('Stagger (ms)', { min: 0, max: 200, step: 10, value: 60 }, (v) => {
      gap = v / 1000;
      s.run(build);
    });
    hint(el, 'Click Account. Opening and closing is one timeline played forwards and back; the items each wait a little longer than the one before.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
