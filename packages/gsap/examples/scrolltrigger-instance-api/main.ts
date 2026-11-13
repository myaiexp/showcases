// ScrollTrigger instances: getAll, getById, next, previous, enable, disable, refresh and kill on three triggers
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const IDS = ['alpha', 'beta', 'gamma'];
let instances = 0;

// vars may carry any extra data (the docs suggest a "group"): getAll() also returns the
// triggers of every other example on the page, so this tags ours to filter them out.
const groupOf = (t: ScrollTrigger): string | undefined => (t.vars as { group?: string }).group;

const mount: Mount = (el, { preview }) => {
  const group = `instance-api-${++instances}`;
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const scroller = h('div', 'scroller', '', wrap);
  const sections = IDS.map((id) => {
    const sec = h('div', 'sec', '', scroller);
    h('div', 'blob', id, sec);
    return sec;
  });
  const side = h('div', 'side', '', wrap);
  const rows = IDS.map((id) => h('button', 'row', id, side));
  const log = h('p', 'log', 'click a row to select it', wrap);

  let selected = IDS[0] ?? '';
  const mine = (): ScrollTrigger[] => ScrollTrigger.getAll().filter((t) => groupOf(t) === group);
  const draw = (): void => {
    const live = mine();
    IDS.forEach((id, i) => {
      const row = rows[i];
      const t = live.find((x) => x.vars.id === id);
      if (!row) return;
      row.classList.toggle('sel', id === selected);
      row.classList.toggle('on', !!t?.isActive);
      row.textContent = t
        ? `${id}   ${Math.round(t.start)}-${Math.round(t.end)}px   ${Math.round(t.progress * 100)}%${t.isActive ? '  active' : ''}`
        : `${id}   (killed)`;
    });
  };
  const say = (msg: string): void => {
    log.textContent = msg;
    draw();
  };

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const build = (): void => {
      for (const t of mine()) t.kill();
      sections.forEach((sec, i) => {
        const vars = {
          id: IDS[i],
          group,
          scroller,
          trigger: sec,
          start: 'top 85%',
          end: 'bottom 35%',
          scrub: 0.4,
          onUpdate: draw,
        };
        gsap.fromTo(sec.firstElementChild, { scale: 0.5, rotation: -60 }, { scale: 1, rotation: 0, ease: 'none', scrollTrigger: vars });
      });
      draw();
    };
    build();

    if (preview) {
      gsap.to(scroller, { scrollTo: { y: 'max' }, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });
      // Disable and re-enable the middle trigger so the card shows the API at work.
      let off = false;
      const id = window.setInterval(() => {
        const t = ScrollTrigger.getById('beta');
        if (!t || groupOf(t) !== group) return;
        off = !off;
        if (off) t.disable();
        else t.enable();
        say(off ? 'beta.disable()' : 'beta.enable()');
      }, 2400);
      cleanups.push(() => clearInterval(id));
    } else {
      const sel = (): ScrollTrigger | undefined => mine().find((t) => t.vars.id === selected);
      rows.forEach((r, i) => r.addEventListener('click', () => { selected = IDS[i] ?? selected; say(`selected "${selected}"`); }));
      const bar = h('div', 'bar', '', wrap);
      const act = (name: string, fn: (t: ScrollTrigger) => string | void): void => {
        btn(name, () => {
          const t = sel();
          say(t ? `${name} -> ${fn(t) ?? 'done'}` : `"${selected}" no longer exists: rebuild it`);
        }, bar);
      };
      act('disable()', (t) => t.disable());
      act('enable()', (t) => t.enable());
      act('enable(true)', (t) => { t.enable(true); return 'progress reset to 0'; });
      act('refresh()', (t) => { t.refresh(); return `start ${Math.round(t.start)}, end ${Math.round(t.end)}`; });
      act('kill()', (t) => t.kill());
      act('next()', (t) => {
        const n = t.next();
        if (n && groupOf(n) === group) { selected = String(n.vars.id); return `"${selected}"`; }
        return 'none of ours (the refresh order continues on the page)';
      });
      act('previous()', (t) => {
        const p = t.previous();
        if (p && groupOf(p) === group) { selected = String(p.vars.id); return `"${selected}"`; }
        return 'none of ours (this is the first)';
      });
      btn('getById("gamma")', () => {
        const t = ScrollTrigger.getById('gamma');
        if (t && groupOf(t) === group) { selected = 'gamma'; say('getById("gamma") -> found, selected'); } else say('getById("gamma") -> undefined');
      }, bar);
      btn('rebuild', () => { ctx.add(build); say('rebuilt'); }, bar);
    }
  }, el);

  return () => {
    for (const c of cleanups) c();
    ctx.revert();
  };
};

export default mount;
