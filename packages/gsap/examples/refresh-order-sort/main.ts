// ScrollTrigger refresh order: a pin created after the trigger below it, then fixed with refreshPriority or sort()
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, check, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PIN_LENGTH = 300;

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const slot = (cls: string, text: string): HTMLElement => h('div', `slot ${cls}`, text, scroller);
  const first = slot('played', 'A  (plays)');
  const pinned = slot('pinned', 'P  (pinned 300px)');
  const last = slot('played', 'C  (plays, below the pin)');
  h('div', 'tail', '', scroller);
  const readout = h('pre', 'readout', '', wrap);

  let inOrder = true;
  let priority = false;
  const made: ScrollTrigger[] = [];
  let timer = 0;

  const show = (): void => {
    const c = made.find((t) => t.trigger === last);
    const p = made.find((t) => t.trigger === pinned);
    const a = made.find((t) => t.trigger === first);
    if (!a || !p || !c) return;
    // The start C should have, read from the layout after the pin spacer has pushed it down.
    const right = Math.round(last.offsetTop - scroller.clientHeight * 0.85);
    const ok = Math.abs(c.start - right) <= 2;
    readout.textContent =
      `refresh order: ${ScrollTrigger.getAll().filter((t) => made.includes(t)).map((t) => String(t.vars.id)).join(' > ')}\n` +
      `A start ${Math.round(a.start)}   P ${Math.round(p.start)}-${Math.round(p.end)}   C start ${Math.round(c.start)}\n` +
      `C should start at ${right}: ${ok ? 'correct' : `${Math.round(right - c.start)}px too early`}`;
  };

  const ctx = gsap.context(() => {
    const play = (id: string, box: HTMLElement, extra: ScrollTrigger.Vars = {}): void => {
      const tw = gsap.to(box, {
        x: 36,
        backgroundColor: '#4c8',
        scrollTrigger: { id, scroller, trigger: box, start: 'top 85%', toggleActions: 'play none none reset', ...extra },
      });
      if (tw.scrollTrigger) made.push(tw.scrollTrigger);
    };
    const pin = (): void => {
      made.push(ScrollTrigger.create({ id: 'P', scroller, trigger: pinned, pin: true, start: 'top top', end: `+=${PIN_LENGTH}` }));
    };

    const build = (): void => {
      for (const t of made) t.kill();
      made.length = 0;
      scroller.scrollTop = 0;
      // refreshPriority: a lower number refreshes later, after the pin has added its spacing.
      const lateC = priority ? { refreshPriority: -1 } : {};
      if (inOrder) {
        play('A', first);
        pin();
        play('C', last, lateC);
      } else {
        play('C', last, lateC); // created first, so the pin below never reaches into its start
        play('A', first);
        pin();
      }
      if (priority) ScrollTrigger.refresh();
      show();
    };
    build();

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
      timer = window.setInterval(() => {
        inOrder = !inOrder;
        ctx.add(build);
      }, 3200);
    } else {
      const bar = h('div', 'bar', '', wrap);
      check('create in page order', (on) => { inOrder = on; ctx.add(build); }, bar).checked = true;
      check('refreshPriority: -1 on C, then refresh()', (on) => { priority = on; ctx.add(build); }, bar);
      btn('ScrollTrigger.sort()', () => { ScrollTrigger.sort(); show(); }, bar);
      btn('ScrollTrigger.refresh()', () => { ScrollTrigger.refresh(); show(); }, bar);
      btn('C.previous() / next()', () => {
        const c = made.find((t) => t.trigger === last);
        readout.textContent += `\nC.previous() id: ${String(c?.previous()?.vars.id)}   C.next() id: ${String(c?.next()?.vars.id)}`;
      }, bar);
    }
  }, el);

  return () => {
    clearInterval(timer);
    ctx.revert();
  };
};

export default mount;
