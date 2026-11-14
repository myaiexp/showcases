// animateLayout returns playback controls: pause, scrub, play, change speed
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const COLOURS = ['#7c5cff', '#2fc4b2', '#ff7a59', '#f2b84b'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="strip" >${COLOURS.map((c, i) => `<div class="photo" data-layout style="background:${c}">${i + 1}</div>`).join('')}</div>`;
  const strip = el.querySelector('.strip') as HTMLElement;
  let controls: Awaited<ReturnType<typeof animateLayout>> | null = null;
  let stacked = false;

  // Awaiting the builder resolves once the update has run and the animation is ready.
  const change = async (duration: number, paused: boolean): Promise<void> => {
    stacked = !stacked;
    const c = await animateLayout(el, () => strip.classList.toggle('stacked', stacked), { duration, ease: 'easeInOut' });
    controls = c;
    if (paused) c.pause();
    else if (preview) c.speed = 0.5; // slow motion
  };

  const scope = scopeMotion(el, () => {
    if (!preview) return;
    const tick = (): void => {
      void change(1.4, false);
      delay(tick, 3);
    };
    delay(tick, 0.6);
  });
  if (preview) return () => scope.cancel();

  const p = panel(el);
  const showTime = p.readout('time', '0.00s');
  const scrub = p.slider('Scrub', { min: 0, max: 100, step: 1, value: 0 }, (v) => {
    if (!controls) return;
    controls.pause();
    controls.time = (v / 100) * controls.duration;
    showTime(controls.time.toFixed(2) + 's');
  });
  p.button('Change layout (paused)', () => {
    scrub.value = '0';
    scope.run(() => void change(2, true));
  });
  p.button('Play', () => controls?.play());
  p.button('Pause', () => controls?.pause());
  p.select('Speed', ['1x', '0.5x', '0.2x'] as const, '1x', (v) => {
    if (controls) controls.speed = Number.parseFloat(v);
  });
  hint(el, 'Press "Change layout", then drag the scrubber back and forth: the animation is held at the time you choose. Play lets it run, at the speed you pick.');

  return () => {
    scope.cancel();
    p.dispose();
  };
};

export default mount;
