// ScrollTrigger.snapDirectional: a snap function that follows the scroll direction, used as a snapTo
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const STEPS = [0, 0.1, 0.5, 0.8, 1];
const MODES = ['snapDirectional(0.25)', 'snapDirectional([0, 0.1, 0.5, 0.8, 1])', 'Math.round(v / 0.25) * 0.25'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const rail = h('div', 'rail', '', wrap);
  const ball = h('div', 'ball', '', rail);
  const scroller = h('div', 'scroller', '', wrap);
  const content = h('div', 'content', '', scroller);
  const readout = h('pre', 'readout', '', wrap);

  const quarter = ScrollTrigger.snapDirectional(0.25);
  const stepped = ScrollTrigger.snapDirectional(STEPS);
  let mode: Mode = MODES[0];
  let st: ScrollTrigger | undefined;
  let last = 'scroll, then stop: the box snaps after a short delay';

  const snapFor = (v: number, dir: number): number => {
    if (mode === MODES[0]) return quarter(v, dir);
    if (mode === MODES[1]) return stepped(v, dir);
    return Math.round(v / 0.25) * 0.25; // plain closest snap, for comparison
  };
  const drawTicks = (): void => {
    for (const t of rail.querySelectorAll('.tick')) t.remove();
    const points = mode === MODES[1] ? STEPS : [0, 0.25, 0.5, 0.75, 1];
    for (const p of points) {
      const tick = h('span', 'tick', '', rail);
      tick.style.left = `${p * 100}%`;
    }
  };
  const show = (): void => {
    const v = st?.progress ?? 0;
    const dir = st?.direction ?? 1;
    readout.textContent =
      `progress ${v.toFixed(2)}  direction ${dir}\n` +
      `snap(v) ${quarter(v).toFixed(2)}   snap(v, 1) ${quarter(v, 1).toFixed(2)}   snap(v, -1) ${quarter(v, -1).toFixed(2)}\n` +
      last;
  };

  const ctx = gsap.context(() => {
    const setX = gsap.quickSetter(ball, 'left', '%');
    const build = (): void => {
      st?.kill();
      drawTicks();
      st = ScrollTrigger.create({
        scroller,
        trigger: content,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          // The function receives where momentum would stop; the direction comes from the instance.
          snapTo: (v: number) => {
            const to = snapFor(v, st?.direction ?? 1);
            last = `natural ${v.toFixed(2)} (dir ${st?.direction ?? 1}) -> snapped ${to.toFixed(2)}`;
            return to;
          },
          duration: { min: 0.2, max: 0.8 },
          delay: 0.15,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          setX(self.progress * 100);
          show();
        },
      });
      show();
    };
    build();

    if (preview) {
      // Scroll forward in a few steps, then back: snapping follows the direction of the last move.
      gsap
        .timeline({ repeat: -1, repeatRefresh: true })
        .to(scroller, { scrollTo: { y: 110 }, duration: 0.6, ease: 'power1.out' })
        .to({}, { duration: 1.4 })
        .to(scroller, { scrollTo: { y: 330 }, duration: 0.6, ease: 'power1.out' })
        .to({}, { duration: 1.4 })
        .to(scroller, { scrollTo: { y: 250 }, duration: 0.5, ease: 'power1.out' })
        .to({}, { duration: 1.4 })
        .to(scroller, { scrollTo: { y: 0 }, duration: 0.6 })
        .to({}, { duration: 1 });
    } else {
      const bar = h('div', 'bar', 'snapTo ', wrap);
      const select = h('select', '', '', bar);
      for (const m of MODES) h('option', '', m, select).value = m;
      select.addEventListener('change', () => {
        mode = select.value as Mode;
        ctx.add(build);
      });
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
