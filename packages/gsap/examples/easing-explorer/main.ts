// GSAP easing explorer: one configurable tween plus a five-ease race
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const EASES: readonly { group: string; items: readonly string[] }[] = [
  { group: 'Power (smooth)', items: ['power1.out', 'power2.out', 'power3.out', 'power4.out', 'power2.in', 'power2.inOut'] },
  { group: 'Expressive', items: ['back.out(1.7)', 'elastic.out(1, 0.4)', 'bounce.out', 'circ.out', 'expo.out', 'sine.inOut'] },
  { group: 'Other', items: ['none'] },
];
const DURATIONS = ['0.6', '1', '1.6', '2.4'];
const RACE = ['none', 'power2.out', 'back.out(1.7)', 'elastic.out(1, 0.4)', 'bounce.out'];

interface Track {
  track: HTMLElement;
  ball: HTMLElement;
  name: HTMLElement;
}

function makeTrack(label: string): Track {
  const track = document.createElement('div');
  track.className = 'track';
  const ball = document.createElement('div');
  ball.className = 'ball';
  const name = document.createElement('span');
  name.className = 'ease-name';
  name.textContent = label;
  track.append(ball, name);
  return { track, ball, name };
}

const endX = (t: Track): number => t.track.clientWidth - t.ball.clientWidth - 12;

function field(label: string, control: HTMLElement): HTMLElement {
  const wrap = document.createElement('label');
  wrap.className = 'field';
  wrap.append(label, control);
  return wrap;
}

const mount: Mount = (el, { preview }) => {
  const ctx = gsap.context(() => undefined, el);
  const race = RACE.map(makeTrack);
  const raceGrid = document.createElement('div');
  raceGrid.className = 'race';
  raceGrid.append(...race.map((t) => t.track));

  const runRace = (loop: boolean): gsap.core.Timeline => {
    const tl = gsap.timeline(loop ? { repeat: -1, repeatDelay: 0.5 } : {});
    race.forEach((t, i) => {
      tl.fromTo(t.ball, { x: 0 }, { x: () => endX(t), duration: 1.6, ease: RACE[i] ?? 'none' }, 0);
    });
    return tl;
  };

  if (preview) {
    raceGrid.classList.add('compact');
    el.append(raceGrid);
    ctx.add(() => runRace(true));
    return () => ctx.revert();
  }

  const single = makeTrack('power2.out');
  const easeSel = document.createElement('select');
  for (const g of EASES) {
    const og = document.createElement('optgroup');
    og.label = g.group;
    for (const item of g.items) og.append(new Option(item === 'none' ? 'none (linear)' : item, item));
    easeSel.append(og);
  }
  easeSel.value = 'power2.out';
  const durSel = document.createElement('select');
  for (const d of DURATIONS) durSel.append(new Option(`${d}s`, d));
  durSel.value = '1';

  const send = document.createElement('button');
  send.className = 'btn btn-primary';
  send.textContent = 'Send';
  const raceBtn = document.createElement('button');
  raceBtn.className = 'btn';
  raceBtn.textContent = 'Race common eases';

  const controls = document.createElement('div');
  controls.className = 'controls';
  controls.append(field('ease', easeSel), field('duration', durSel), send);

  const buttons = document.createElement('div');
  buttons.className = 'buttons';
  buttons.append(raceBtn);
  el.append(controls, single.track, buttons, raceGrid);

  easeSel.addEventListener('change', () => {
    single.name.textContent = easeSel.value;
  });
  send.addEventListener('click', () => {
    single.name.textContent = easeSel.value;
    ctx.add(() => {
      gsap.killTweensOf(single.ball);
      gsap.fromTo(single.ball, { x: 0 }, { x: endX(single), duration: Number(durSel.value), ease: easeSel.value });
    });
  });
  raceBtn.addEventListener('click', () => {
    ctx.add(() => {
      gsap.killTweensOf(race.map((t) => t.ball));
      runRace(false);
    });
  });

  return () => ctx.revert();
};

export default mount;
