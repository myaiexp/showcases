// gsap.to, from, fromTo and set run side by side from the same resting position
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const CUR = 70; // the "current" x each dot rests at before a cycle
const END = 160;

const mount: Mount = (el, { preview }) => {
  const rows = [
    { key: 'to', code: `gsap.to(dot, { x: ${END} })`, note: 'current -> end' },
    { key: 'from', code: 'gsap.from(dot, { x: 0 })', note: 'start -> current' },
    { key: 'fromTo', code: `gsap.fromTo(dot, { x: 0 }, { x: ${END} })`, note: 'start -> end' },
    { key: 'set', code: `gsap.set(dot, { x: ${END} })`, note: 'instant jump' },
  ];
  const wrap = document.createElement('div');
  wrap.className = 'rows';
  const dots: HTMLElement[] = [];
  for (const r of rows) {
    const row = document.createElement('div');
    row.className = 'row';
    const label = document.createElement('div');
    label.className = 'label';
    const name = document.createElement('strong');
    name.textContent = r.key + '()';
    label.append(name);
    if (!preview) {
      const code = document.createElement('code');
      code.textContent = r.code;
      const note = document.createElement('span');
      note.textContent = r.note;
      label.append(code, note);
    }
    const track = document.createElement('div');
    track.className = 'track';
    const dot = document.createElement('div');
    dot.className = 'dot';
    track.append(dot);
    dots.push(dot);
    row.append(label, track);
    wrap.append(row);
  }
  el.append(wrap);

  const [toDot, fromDot, fromToDot, setDot] = dots as [HTMLElement, HTMLElement, HTMLElement, HTMLElement];
  let setTimer = 0;
  let cycleTimer = 0;

  const run = (): void => {
    window.clearTimeout(setTimer);
    // Not in a context: every cycle makes new tweens and a context would keep them all.
    // The cleanup kills them by hand.
    {
      gsap.set(dots, { x: CUR, clearProps: 'backgroundColor' });
      const vars = { duration: 1.2, ease: 'power2.inOut', overwrite: true };
      gsap.to(toDot, { x: END, ...vars });
      gsap.from(fromDot, { x: 0, ...vars });
      gsap.fromTo(fromToDot, { x: 0 }, { x: END, ...vars });
      // set() has no duration, so fire it halfway through the others
      setTimer = window.setTimeout(() => {
        gsap.set(setDot, { x: END, backgroundColor: '#0ae448' });
      }, 600);
    }
  };

  run();
  cycleTimer = window.setInterval(run, 3200);

  if (!preview) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay';
    btn.addEventListener('click', () => {
      window.clearInterval(cycleTimer);
      run();
      cycleTimer = window.setInterval(run, 3200);
    });
    el.append(btn);
  }

  return () => {
    window.clearTimeout(setTimer);
    window.clearInterval(cycleTimer);
    gsap.killTweensOf(dots);
    gsap.set(dots, { clearProps: 'all' });
  };
};

export default mount;
