// A photo carousel that locks to the first direction you move: directionLock and onDirectionLock
import { drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const COLOURS = ['#e0508a', '#f2a65a', '#5b8def', '#4cc38a', '#a66cff', '#e8c547'];

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="page${preview ? '' : ' big'}">
      <div class="row skeleton"></div>
      <div class="viewport"><div class="track"></div><span class="badge">free</span></div>
      <div class="row skeleton"></div>
    </div>`;
  const track = el.querySelector<HTMLElement>('.track')!;
  const viewport = el.querySelector<HTMLElement>('.viewport')!;
  const badge = el.querySelector<HTMLElement>('.badge')!;
  COLOURS.forEach((c, i) => {
    const s = document.createElement('div');
    s.className = 'slide';
    s.style.background = c;
    s.textContent = String(i + 1);
    track.append(s);
  });

  let lock = true;
  let stop: VoidFunction = () => undefined;
  const arm = (): void => {
    stop();
    const range = Math.max(0, track.scrollWidth - viewport.clientWidth);
    stop = drag(track, {
      // Pixel constraints: slide sideways through the photos; up and down is almost fixed.
      constraints: { left: -range, right: 0, top: 0, bottom: 0 },
      elastic: { left: 0.3, right: 0.3, top: 0.05, bottom: 0.05 },
      directionLock: lock,
      onDirectionLock: (axis) => {
        badge.textContent = `locked to ${axis}`;
        badge.dataset.axis = axis;
      },
      onEnd: () => {
        badge.textContent = 'free';
        delete badge.dataset.axis;
      },
    });
  };
  const scope = scopeMotion(el, arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Swipe the photos with a sloppy diagonal: the first direction you move wins, so the strip stays level. Switch the lock off to see it wander.');
    p = panel(el);
    p.toggle('directionLock', true, (v) => {
      lock = v;
      scope.run(arm);
    });
  } else {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const sideways = i++ % 2 === 0;
      const from = at(el, track, 0.8, 0.5);
      await g.drag(track, from, sideways ? { x: from.x - 110, y: from.y + 26 } : { x: from.x - 6, y: from.y + 40 }, 0.5);
      await g.wait(0.9);
    }, 0.4);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
