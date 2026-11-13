// A ScrollTrigger and its animation: tween.scrollTrigger, timeline.scrollTrigger, st.animation, getTween() and the kill() flags
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const lane = (n: number, label: string): HTMLElement => {
    const row = h('div', `lane alink-row-${n}`, '', scroller);
    h('span', 'label', label, row);
    return h('div', 'dot', '', row);
  };
  const dots = [lane(1, 'gsap.to({ scrollTrigger })'), lane(2, 'timeline({ scrollTrigger })'), lane(3, 'ScrollTrigger.create({ animation })')];
  h('div', 'tail', '', scroller);
  const readout = h('pre', 'readout', '', wrap);

  let tween: gsap.core.Tween | undefined; // row 1: the trigger lives in the tween's vars
  let tl: gsap.core.Timeline | undefined; // row 2: ... in the timeline's vars
  let plain: gsap.core.Tween | undefined; // row 3: a plain tween handed to a standalone trigger
  let standalone: ScrollTrigger | undefined;
  let note = 'scroll the box';

  const pct = (n: number | undefined): string => `${Math.round((n ?? 0) * 100)}%`;
  const show = (): void => {
    const lines = [
      `tween.scrollTrigger ${tween?.scrollTrigger ? `progress ${pct(tween.scrollTrigger.progress)}` : 'undefined'}`,
      `timeline.scrollTrigger ${tl?.scrollTrigger ? `progress ${pct(tl.scrollTrigger.progress)}` : 'undefined'}`,
      `standalone.animation === tween: ${standalone ? String(standalone.animation === plain) : 'n/a'}   plain tween has scrollTrigger: ${String(plain?.scrollTrigger)}`,
    ];
    if (!preview) {
      const t = tween?.scrollTrigger;
      lines.push(
        `row 1: vars.trigger is ${typeof t?.vars.trigger}, trigger is ${t?.trigger ? t.trigger.constructor.name : 'gone'}   getTween() ${t?.getTween() ? 'scrub tween' : 'none'}`,
        note,
      );
    }
    readout.textContent = lines.join('\n');
  };

  const ctx = gsap.context(() => {
    const range = (n: number): ScrollTrigger.Vars => ({ scroller, trigger: `.alink-row-${n}`, start: 'top 90%', end: 'top 35%', scrub: n === 1 ? 1 : true, onUpdate: show });
    const build = (): void => {
      tween?.scrollTrigger?.kill();
      tl?.scrollTrigger?.kill();
      standalone?.kill();
      plain?.kill();
      gsap.set(dots, { clearProps: 'all' });
      tween = gsap.to(dots[0] as HTMLElement, { x: 150, ease: 'none', scrollTrigger: { id: 'alink-1', ...range(1) } });
      tl = gsap.timeline({ scrollTrigger: range(2) });
      tl.to(dots[1] as HTMLElement, { x: 150, ease: 'none' }).to(dots[1] as HTMLElement, { scale: 1.8, rotation: 180 });
      plain = gsap.to(dots[2] as HTMLElement, { x: 150, ease: 'none' });
      standalone = ScrollTrigger.create({ ...range(3), animation: plain });
      note = 'rebuilt';
      show();
    };
    build();

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    } else {
      const bar = h('div', 'bar', '', wrap);
      const say = (t: string): void => { note = t; show(); };
      btn('row 1: scrollTrigger.refresh()', () => { tween?.scrollTrigger?.refresh(); say('refresh() on just that trigger'); }, bar);
      btn('getTween().progress(1)', () => { tween?.scrollTrigger?.getTween()?.progress(1); say('scrub tween forced to catch up with the scrollbar'); }, bar);
      btn('kill()', () => { tween?.scrollTrigger?.kill(); say('kill(): trigger and animation killed, reverted'); }, bar);
      btn('kill(false)', () => { tween?.scrollTrigger?.kill(false); say('kill(false): animation killed but left where it was'); }, bar);
      btn('kill(false, true)', () => { tween?.scrollTrigger?.kill(false, true); say('kill(false, true): trigger gone, animation alive: press tween.play()'); }, bar);
      btn('tween.play()', () => { tween?.play(); say('tween.play()'); }, bar);
      btn('rebuild', () => ctx.add(build), bar);
    }
  }, el);

  return () => ctx.revert();
};

export default mount;
