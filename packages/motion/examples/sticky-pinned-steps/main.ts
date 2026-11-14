// A feature section that stays pinned with position: sticky and swaps through three panels as you scroll its tall track
import { animate, scopeMotion, scroll } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const STEPS: Array<[title: string, text: string]> = [
  ['Plan', 'Sketch the week in one place and drag tasks into days.'],
  ['Track', 'Tick things off and watch the ring fill as the week goes by.'],
  ['Share', 'Send the finished plan to a teammate with one link.'],
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="pinned">
      <div class="scroller">
        <div class="track">
          <div class="pin">
            <div class="cue">Scroll down</div>
            <div class="panels"></div>
            <div class="dots"><b></b><b></b><b></b></div>
          </div>
        </div>
        <div class="outro">That is the tour</div>
      </div>
    </div>`;
  el.querySelector('.pinned')!.classList.toggle('full', !preview);
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const track = el.querySelector<HTMLElement>('.track')!;
  const panels = el.querySelector<HTMLElement>('.panels')!;
  STEPS.forEach(([title, text], i) => {
    const p = document.createElement('div');
    p.className = `panel p${i}`;
    const art = document.createElement('div');
    art.className = 'art';
    const h = document.createElement('h4');
    h.textContent = `${i + 1}. ${title}`;
    const t = document.createElement('p');
    t.textContent = text;
    p.append(art, h, t);
    panels.append(p);
  });
  const panelEls = [...panels.children] as HTMLElement[];
  const dotEls = [...el.querySelectorAll<HTMLElement>('.dots b')];
  if (!preview) hint(el, 'Scroll the panel. The tall track gives the page room to scroll while the stage stays stuck in place (position: sticky); scroll() uses the track as target to know how far through the pinned stretch you are.');

  const scope = scopeMotion(el, () => {
    let step = -1;
    const show = (next: number): void => {
      const prev = step;
      step = next;
      const dir = next > prev ? 1 : -1;
      if (prev >= 0) animate(panelEls[prev]!, { opacity: 0, y: -24 * dir }, { duration: 0.25 });
      animate(panelEls[next]!, { opacity: [0, 1], y: [24 * dir, 0] }, { duration: 0.35 });
      dotEls.forEach((d, i) => animate(d, { scale: i === next ? 1.6 : 1, opacity: i === next ? 1 : 0.4 }, { duration: 0.2 }));
    };
    // The track is as tall as the panel several times over. Default offset = from the track's top
    // reaching the panel's top to its bottom reaching the panel's bottom: exactly the pinned stretch.
    scroll((progress) => {
      const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      if (next !== step) show(next);
    }, { container: scroller, target: track });
    if (preview) autoScroll(scroller, { duration: 8 });
  });
  return () => scope.cancel();
};

export default mount;
