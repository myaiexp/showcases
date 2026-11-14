// Two loading spinners: stagger() with startDelay -1.2 makes the spinner start mid-spin instead of building up
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SEGMENTS = 12;
const LOOP = 1.2;

const mount: Mount = (el, { preview }) => {
  const spinner = (title: string): string => `
    <div class="spin"><div class="ring">${Array.from({ length: SEGMENTS }, (_, i) => `<i style="transform:rotate(${i * (360 / SEGMENTS)}deg) translateY(-26px)"></i>`).join('')}</div><span>${title}</span></div>`;
  el.innerHTML = `
    <div class="pair${preview ? '' : ' full'}">
      ${spinner('startDelay: 0')}
      ${spinner('startDelay: -1.2')}
    </div>
    <code class="call"></code>`;
  const rings = [...el.querySelectorAll<HTMLElement>('.ring')];
  let step = 0.1;
  let run: <R>(cb: () => R) => R = (cb) => cb();
  let controls: { cancel(): void }[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const play = (): void => {
    for (const c of controls) c.cancel();
    el.querySelector('.call')!.textContent = `stagger(${step}, { startDelay: -${LOOP} })`;
    run(() => {
      controls = rings.map((ring, r) => animate(
        ring.querySelectorAll('i'),
        { opacity: [1, 0.12] },
        {
          duration: LOOP,
          repeat: Infinity,
          ease: 'linear',
          // A negative startDelay starts every segment part-way through its first fade.
          delay: stagger(step, { startDelay: r === 0 ? 0 : -LOOP }),
        },
      ));
    });
  };

  const scope = scopeMotion(el, (s) => {
    run = s.run;
    play();
    if (preview) {
      // Restart both now and then, so the difference in how they begin can be seen again.
      const tick = (): void => {
        play();
        delay(tick, 4);
      };
      delay(tick, 4);
    } else {
      hint(el, 'Press Restart and watch the first second. The left spinner builds up from nothing; the right one, with a negative startDelay, is already fully spinning.');
      p = panel(el);
      p.button('Restart', play);
      p.slider('segment gap (s)', { min: 0.03, max: 0.2, step: 0.01, value: step }, (v) => { step = v; play(); });
    }
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
