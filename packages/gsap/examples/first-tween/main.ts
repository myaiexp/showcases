// The four tween methods plus a plain-object target, each looping on its own track
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const el$ = (tag: string, cls: string, text = ''): HTMLElement => {
  const n = document.createElement(tag);
  n.className = cls;
  n.textContent = text;
  return n;
};

const mount: Mount = (el, { preview }) => {
  const root = el$('div', preview ? 'demo compact' : 'demo');
  const T = preview ? 150 : 300; // how far a box travels

  const makeRow = (code: string): { box: HTMLElement; track: HTMLElement } => {
    const row = el$('div', 'row');
    const track = el$('div', 'track');
    const box = el$('div', 'box');
    track.append(box);
    row.append(el$('code', 'code', code), track);
    root.append(row);
    return { box, track };
  };

  const to = makeRow('gsap.to(box, { x })');
  const from = makeRow('gsap.from(box, { x })');
  const fromTo = makeRow('gsap.fromTo(box, {…}, {…})');
  const set = makeRow('gsap.set(box, { x })');
  const obj = makeRow('gsap.to(obj, { num: 100 })');
  const readout = el$('code', 'num', 'num: 0');
  obj.track.append(readout);
  el.append(root);

  const ctx = gsap.context(() => {
    const counter = { num: 0 };
    const loop = { duration: 1.4, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.5 };
    const tweens: gsap.core.Animation[] = [
      // to(): starts where the box is now (x:0) and ends at the values given
      gsap.to(to.box, { x: T, rotation: 360, ...loop }),
      // from(): starts at the values given and ends where the box is now
      gsap.from(from.box, { x: T, rotation: -360, ...loop }),
      // fromTo(): both ends spelled out
      gsap.fromTo(fromTo.box, { x: T * 0.25, scale: 0.5 }, { x: T * 0.75, scale: 1.5, ...loop }),
      // set(): a zero-duration tween, so it needs a timeline to repeat
      gsap
        .timeline({ repeat: -1 })
        .set(set.box, { x: 0 }, 0)
        .set(set.box, { x: T / 2 }, 0.8)
        .set(set.box, { x: T }, 1.6)
        .set(set.box, { x: T }, 2.4),
      // any numeric property of any object can be tweened, no DOM needed
      gsap.to(counter, {
        num: 100,
        duration: 2,
        ease: 'none',
        repeat: -1,
        onUpdate() {
          const n = counter.num;
          readout.textContent = `num: ${Math.round(n)}`;
          obj.box.style.transform = `translateX(${(n / 100) * T}px)`;
        },
      }),
    ];
    if (!preview) {
      const bar = el$('div', 'bar');
      const replay = el$('button', 'btn', 'Restart all');
      replay.addEventListener('click', () => tweens.forEach((t) => t.restart()));
      bar.append(replay);
      root.append(bar);
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
