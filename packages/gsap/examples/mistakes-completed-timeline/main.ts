// Adding a tween to a timeline that already finished does nothing; a fresh tween per click works
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const T = preview ? 90 : 180;
  const mkLane = (title: string, code: string, cls: string): { box: HTMLElement; reading: HTMLElement; click: HTMLButtonElement } => {
    const lane = document.createElement('div');
    lane.className = `lane ${cls}`;
    const h = document.createElement('h4');
    h.textContent = title;
    const c = document.createElement('code');
    c.textContent = code;
    const track = document.createElement('div');
    track.className = 'track';
    const box = document.createElement('div');
    box.className = 'box';
    track.append(box);
    const reading = document.createElement('span');
    reading.className = 'reading';
    const click = document.createElement('button');
    click.className = 'btn';
    click.textContent = 'Move again';
    lane.append(h, c, track, reading);
    if (!preview) lane.append(click);
    root.append(lane);
    return { box, reading, click };
  };
  const bad = mkLane('The mistake', 'tl.to(box, { x })  // tl already finished', 'bad');
  const good = mkLane('The fix', 'gsap.to(box, { x })  // a new tween', 'good');
  el.append(root);

  let tl: gsap.core.Timeline | undefined;
  const rand = (): number => gsap.utils.random(20, T, 1);
  const addToFinished = (): void => void tl?.to(bad.box, { x: rand(), duration: 0.6 });
  const freshTween = (): void => void gsap.to(good.box, { x: rand(), duration: 0.6 });

  const timers: number[] = [];
  const clearTimers = (): void => {
    for (const t of timers.splice(0)) window.clearTimeout(t);
  };
  const restart = (): void => {
    clearTimers();
    tl?.kill();
    gsap.killTweensOf([bad.box, good.box]);
    gsap.set([bad.box, good.box], { x: 0 });
    // built once, plays through and completes: from here on it no longer ticks
    tl = gsap.timeline();
    tl.to(bad.box, { x: T / 2, duration: 0.8 });
    tl.to(good.box, { x: T / 2, duration: 0.8 }, 0);
  };
  const read = (): void => {
    bad.reading.textContent = tl
      ? `tl.progress() ${tl.progress().toFixed(2)}  duration ${tl.duration().toFixed(1)}s  children ${tl.getChildren().length}`
      : '';
    good.reading.textContent = `isTweening ${gsap.isTweening(good.box)}`;
  };
  gsap.ticker.add(read);
  restart();

  let loop = 0;
  if (preview) {
    const cycle = (): void => {
      restart();
      [1300, 2300, 3300].forEach((ms) => timers.push(window.setTimeout(() => { addToFinished(); freshTween(); }, ms)));
    };
    cycle();
    loop = window.setInterval(cycle, 5200);
  } else {
    bad.click.addEventListener('click', addToFinished);
    good.click.addEventListener('click', freshTween);
    const again = document.createElement('button');
    again.className = 'btn all';
    again.textContent = 'Rebuild the timeline';
    again.addEventListener('click', restart);
    root.append(again);
  }

  return () => {
    window.clearInterval(loop);
    clearTimers();
    gsap.ticker.remove(read);
    tl?.kill();
    gsap.killTweensOf([bad.box, good.box]);
  };
};

export default mount;
