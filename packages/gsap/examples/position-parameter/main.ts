// Draws a timeline as lanes so the position parameter's effect on start times is visible
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const POSITIONS = ['+=0', '+=0.5', '-=0.5', '<', '>', '<25%', '>-25%', '-=25%', '+=50%', 'mid', 'mid+=0.5', '3'];
const SPAN = 4.5; // seconds shown across the lanes
const NAMES = ['A', 'B', 'C'] as const;

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = 'wrap';
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  const bars: HTMLElement[] = [];
  const dots: HTMLElement[] = [];
  for (const name of NAMES) {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = name;
    const track = document.createElement('div');
    track.className = 'track';
    const bar = document.createElement('div');
    bar.className = `bar bar-${name}`;
    const dot = document.createElement('div');
    dot.className = `dot bar-${name}`;
    track.append(bar, dot);
    lane.append(tag, track);
    lanes.append(lane);
    bars.push(bar);
    dots.push(dot);
  }
  const playhead = document.createElement('div');
  playhead.className = 'playhead';
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.append(playhead);
  lanes.append(overlay);
  const code = document.createElement('code');
  code.className = 'code';
  const note = document.createElement('p');
  note.className = 'note';
  root.append(lanes, code);
  if (!preview) root.append(note);
  el.append(root);

  let tl: gsap.core.Timeline | undefined;
  const pct = (t: number): string => `${(t / SPAN) * 100}%`;

  // Not in a context: each build makes a new timeline, and a context would keep every one.
  // The previous timeline is killed by hand before the next, and again in the cleanup.
  const build = (position: string): void => {
    tl?.kill();
    gsap.set(dots, { x: 0 });
    const pos: string | number = /^\d+(\.\d+)?$/.test(position) ? Number(position) : position;
    tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, defaults: { duration: 1, ease: 'power1.inOut' } });
    tl.addLabel('mid', 1);
    // A and B are placed back to back (the default "+=0"); C uses the chosen position.
    tl.to(dots[0] ?? [], { x: 60 });
    tl.to(dots[1] ?? [], { x: 60 });
    tl.to(dots[2] ?? [], { x: 60 }, pos);
    const children = dots.map((dot) => tl?.getTweensOf(dot)[0]);
    children.forEach((tween, i) => {
      const bar = bars[i];
      if (!bar || !tween) return;
      bar.style.left = pct(tween.startTime());
      bar.style.width = pct(tween.duration());
    });
    tl.eventCallback('onUpdate', () => {
      if (tl) playhead.style.left = pct(Math.min(tl.time(), SPAN));
    });
    const shown = typeof pos === 'number' ? pos : JSON.stringify(pos);
    code.textContent = `tl.to(".C", { x: 60 }, ${shown});`;
    const c = children[2];
    note.textContent = c ? `C starts at ${c.startTime().toFixed(2)}s; timeline lasts ${tl.duration().toFixed(2)}s.` : '';
  };

  let cycle: number | undefined;
  let select: HTMLSelectElement | undefined;
  if (preview) {
    let i = 0;
    build(POSITIONS[0] ?? '+=0');
    cycle = window.setInterval(() => build(POSITIONS[++i % POSITIONS.length] ?? '+=0'), 3600);
  } else {
    const row = document.createElement('div');
    row.className = 'controls';
    const label = document.createElement('label');
    label.textContent = 'Position of C: ';
    select = document.createElement('select');
    for (const p of POSITIONS) {
      const o = document.createElement('option');
      o.value = p;
      o.textContent = /^\d/.test(p) ? p : `"${p}"`;
      select.append(o);
    }
    select.addEventListener('change', onChange);
    label.append(select);
    row.append(label);
    el.append(row);
    build('+=0');
  }
  function onChange(): void {
    if (select) build(select.value);
  }

  return () => {
    window.clearInterval(cycle);
    select?.removeEventListener('change', onChange);
    tl?.kill();
    gsap.set(dots, { clearProps: 'transform' });
  };
};

export default mount;
