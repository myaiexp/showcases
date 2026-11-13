// Clicking a from() fade-in repeatedly leaves it dim; fromTo() always ends at the value you wrote
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const mkLane = (title: string, code: string, cls: string): { box: HTMLElement; reading: HTMLElement; click: HTMLButtonElement } => {
    const lane = document.createElement('div');
    lane.className = `lane ${cls}`;
    const h = document.createElement('h4');
    h.textContent = title;
    const c = document.createElement('code');
    c.textContent = code;
    const box = document.createElement('div');
    box.className = 'box';
    const reading = document.createElement('span');
    reading.className = 'reading';
    const click = document.createElement('button');
    click.className = 'btn';
    click.textContent = 'Click';
    lane.append(h, c, box, reading);
    if (!preview) lane.append(click);
    root.append(lane);
    return { box, reading, click };
  };
  const bad = mkLane('The mistake', 'gsap.from(box, { opacity: 0 })', 'bad');
  const good = mkLane('The fix', 'gsap.fromTo(box, { opacity: 0 }, { opacity: 1 })', 'good');
  el.append(root);

  const fadeBad = (): void => void gsap.from(bad.box, { opacity: 0, duration: 1 });
  const fadeGood = (): void => void gsap.fromTo(good.box, { opacity: 0 }, { opacity: 1, duration: 1 });

  const timers: number[] = [];
  const clearTimers = (): void => {
    for (const t of timers.splice(0)) window.clearTimeout(t);
  };
  // from() ends at the CURRENT opacity, so a click during a fade makes it end at that dim value.
  const burst = (): void => {
    clearTimers();
    gsap.killTweensOf([bad.box, good.box]);
    gsap.set([bad.box, good.box], { opacity: 1 });
    [0, 150, 300].forEach((ms) => timers.push(window.setTimeout(() => { fadeBad(); fadeGood(); }, ms)));
  };
  const read = (): void => {
    bad.reading.textContent = `opacity ${Number(gsap.getProperty(bad.box, 'opacity')).toFixed(2)}`;
    good.reading.textContent = `opacity ${Number(gsap.getProperty(good.box, 'opacity')).toFixed(2)}`;
  };
  gsap.ticker.add(read);

  let loop = 0;
  if (preview) {
    burst();
    loop = window.setInterval(burst, 3800);
  } else {
    bad.click.addEventListener('click', fadeBad);
    good.click.addEventListener('click', fadeGood);
    const both = document.createElement('button');
    both.className = 'btn all';
    both.textContent = 'Click both 3 times quickly';
    both.addEventListener('click', burst);
    root.append(both);
  }

  return () => {
    window.clearInterval(loop);
    clearTimers();
    gsap.ticker.remove(read);
    gsap.killTweensOf([bad.box, good.box]);
  };
};

export default mount;
