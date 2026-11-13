// A flash of unstyled content: JS-set start state versus CSS visibility:hidden revealed by autoAlpha
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const LOAD_MS = 1300; // pretend the script arrives this long after the HTML

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const panel = (title: string, hidden: boolean): { cards: HTMLElement[]; status: HTMLElement } => {
    const p = document.createElement('section');
    p.className = 'panel';
    const h = document.createElement('code');
    h.textContent = title;
    const row = document.createElement('div');
    row.className = 'cards';
    const cards = [0, 1, 2].map(() => {
      const c = document.createElement('div');
      c.className = hidden ? 'card hidden' : 'card'; // .hidden is visibility:hidden in the stylesheet
      row.append(c);
      return c;
    });
    const status = document.createElement('span');
    status.className = 'status';
    p.append(h, row, status);
    root.append(p);
    return { cards, status };
  };
  const flash = panel('opacity:0 set from JS', false);
  const safe = panel('CSS visibility:hidden + autoAlpha', true);
  el.append(root);
  const all = [...flash.cards, ...safe.cards];

  const timers: number[] = [];
  const clearTimers = (): void => {
    for (const t of timers.splice(0)) window.clearTimeout(t);
  };

  const run = (): void => {
    clearTimers();
    gsap.killTweensOf(all);
    gsap.set(all, { clearProps: 'all' }); // back to what the stylesheet says
    flash.status.textContent = 'HTML painted...';
    safe.status.textContent = 'HTML painted...';
    timers.push(
      window.setTimeout(() => {
        // The "script" finally runs. Left: the start state is only now applied, so the
        // cards were visible until this moment.
        gsap.set(flash.cards, { opacity: 0 });
        gsap.to(flash.cards, { opacity: 1, duration: 0.6, stagger: 0.12 });
        // Right: already hidden by CSS; autoAlpha fades in and flips visibility to inherit.
        gsap.to(safe.cards, { autoAlpha: 1, duration: 0.6, stagger: 0.12 });
        flash.status.textContent = 'script ran: cards vanish, then fade in';
        safe.status.textContent = 'script ran: cards fade in';
      }, LOAD_MS),
    );
  };
  run();

  let loop = 0;
  if (preview) loop = window.setInterval(run, 4600);
  else {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Reload the page';
    btn.addEventListener('click', run);
    root.append(btn);
  }

  return () => {
    window.clearInterval(loop);
    clearTimers();
    gsap.killTweensOf(all);
  };
};

export default mount;
