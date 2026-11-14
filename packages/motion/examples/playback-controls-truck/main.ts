// A truck animation driven through the playback controls animate() returns
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SPEEDS = ['-1', '0.5', '1', '2'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="route">
      <span class="pin from">Depot</span>
      <div class="road"><span class="truck">🚚</span></div>
      <span class="pin to">Home</span>
    </div>
    <div class="speed-label"></div>`;
  const speedLabel = el.querySelector('.speed-label') as HTMLElement;

  let raf = 0;
  const scope = scopeMotion(el, () => {
    // The controls object: speed, time, pause(), play(), complete(), cancel(), stop(), duration.
    const drive = (repeat: boolean): ReturnType<typeof animate> => animate('.truck', { x: [0, 160] }, {
      duration: 6,
      ease: 'linear',
      ...(repeat ? { repeat: Infinity, repeatType: 'reverse' as const, duration: 3 } : {}),
    });
    let anim = drive(preview);

    if (preview) {
      const speeds = [1, 2, 0.5, -1];
      let i = 0;
      const tick = (): void => {
        const s = speeds[i++ % speeds.length] as number;
        if (s < 0) anim.time = anim.duration * 0.9;
        anim.speed = s;
        speedLabel.textContent = `speed ${s}`;
        delay(tick, 1.4);
      };
      speedLabel.textContent = 'speed 1';
      delay(tick, 1.4);
      return;
    }

    const p = panel(el);
    const showDuration = p.readout('duration (read-only)', `${anim.duration}s`);
    const showTime = p.readout('time', '0.00');
    let paused = false;
    p.button('Pause / play', () => {
      paused = !paused;
      if (paused) anim.pause();
      else anim.play();
    });
    p.select('speed', SPEEDS, '1', (v) => { anim.speed = Number(v); });
    const scrub = p.slider('time (scrub)', { min: 0, max: 6, step: 0.05, value: 0 }, (v) => { anim.time = v; });
    p.button('Complete', () => anim.complete());
    p.button('Cancel', () => anim.cancel());
    p.button('Stop', () => anim.stop());
    p.button('New delivery', () => {
      anim.cancel();
      paused = false;
      anim = drive(false);
      showDuration(`${anim.duration}s`);
    });
    // Read the animation back every frame so the slider follows it.
    const follow = (): void => {
      scrub.value = String(anim.time);
      showTime(anim.time.toFixed(2));
      raf = requestAnimationFrame(follow);
    };
    follow();
    hint(el, 'Speed -1 drives home again. Stop leaves the truck where it is and cannot be resumed (press New delivery); Cancel puts it back at the depot; Complete jumps to the door.');
    return () => p.dispose();
  });

  return () => {
    cancelAnimationFrame(raf);
    scope.cancel();
  };
};

export default mount;
