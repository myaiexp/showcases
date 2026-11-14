// Two things the raw Web Animations API gets wrong and Motion's animate() fixes: it forgets where it ended, and it jumps when interrupted
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type Scenario = 'Keep the end state' | 'Interrupt a running animation';
const SCENARIOS: readonly Scenario[] = ['Keep the end state', 'Interrupt a running animation'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="lanes">
      <section class="raw"><header><b>element.animate()</b><span class="note"></span></header><div class="track"><i class="box"></i></div></section>
      <section class="mo"><header><b>Motion animate()</b><span class="note"></span></header><div class="track"><i class="box"></i></div></section>
    </div>
    <p class="what"></p>`;
  el.classList.toggle('is-full', !preview);
  const rawBox = el.querySelector<HTMLElement>('.raw .box')!;
  const moBox = el.querySelector<HTMLElement>('.mo .box')!;
  const rawNote = el.querySelector<HTMLElement>('.raw .note')!;
  const moNote = el.querySelector<HTMLElement>('.mo .note')!;
  const what = el.querySelector<HTMLElement>('.what')!;
  const track = el.querySelector<HTMLElement>('.track')!;

  let scenario: Scenario = 'Keep the end state';
  let ui: ReturnType<typeof panel> | undefined;
  const cleanups: (() => void)[] = [];
  let runFn: (() => void) | undefined;
  const scope = scopeMotion(el, ({ bind }) => {
    const W = (): number => track.clientWidth - rawBox.offsetWidth - 2;

    const reset = (): void => {
      for (const a of rawBox.getAnimations()) a.cancel();
      animate(moBox, { x: 0 }, { duration: 0 });
    };

    const run = (): void => {
      reset();
      const w = W();
      rawNote.textContent = '';
      moNote.textContent = '';
      if (scenario === 'Keep the end state') {
        what.textContent = 'Each box slides right once.';
        // Raw WAAPI: the animation ends and the box snaps back, unless you add fill: 'forwards' and live with the leftovers.
        const a = rawBox.animate({ transform: ['translateX(0px)', `translateX(${w}px)`] }, { duration: 700, easing: 'ease-in-out' });
        a.finished.then(bind(() => (rawNote.textContent = 'snapped back')), () => undefined);
        // Motion animates to the value and leaves it there.
        animate(moBox, { x: w }, { duration: 0.7, ease: 'easeInOut' }).then(bind(() => (moNote.textContent = 'stays put')));
      } else {
        what.textContent = 'Both loop to the right, then 0.7s in are told to go home.';
        rawBox.animate({ transform: ['translateX(0px)', `translateX(${w}px)`] }, { duration: 2000, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });
        animate(moBox, { x: [0, w] }, { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' });
        delay(() => {
          // Raw WAAPI: a second animation on the same property just layers over the loop, and when it ends the box jumps back to the loop.
          rawBox.animate({ transform: 'none' }, { duration: 500, easing: 'ease-out' });
          // Motion interrupts the loop on x and carries on from where the box is.
          animate(moBox, { x: 0 }, { duration: 0.5, ease: 'easeOut' });
          rawNote.textContent = 'jumps back to the loop';
          moNote.textContent = 'settles at home';
        }, 0.7);
      }
    };

    if (preview) {
      let i = 0;
      const tick = (): void => {
        scenario = SCENARIOS[i++ % 2]!;
        run();
        delay(tick, 3.6);
      };
      delay(tick, 0.4);
    } else {
      cleanups.push(() => reset());
      run();
      runFn = run;
    }
  });

  if (!preview) {
    ui = panel(el);
    ui.select('scenario', SCENARIOS, scenario, (v) => {
      scenario = v;
      scope.run(() => runFn?.());
    });
    ui.button('Play', () => scope.run(() => runFn?.()));
    hint(el, 'Play each scenario. The top box is the browser\'s raw element.animate(); the bottom one is Motion. Same durations, different outcomes.');
  }

  return () => {
    scope.cancel();
    for (const c of cleanups) c();
    for (const a of rawBox.getAnimations()) a.cancel();
    ui?.dispose();
  };
};

export default mount;
