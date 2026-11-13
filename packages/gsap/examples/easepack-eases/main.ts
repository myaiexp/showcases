// Four EasePack-style eases (rough, slow, expoScale) plus steps() each moving a box along its own lane
import { gsap } from 'gsap';
import { EasePack } from 'gsap/EasePack';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(EasePack);

const LANES = [
  { label: 'rough({strength: 2, points: 30, taper: out})', short: 'rough()', prop: 'x', ease: 'rough({strength: 2, points: 30, taper: out})' },
  { label: 'slow(0.5, 0.8)', short: 'slow()', prop: 'x', ease: 'slow(0.5, 0.8)' },
  { label: 'steps(6)', short: 'steps(6)', prop: 'x', ease: 'steps(6)' },
  { label: 'expoScale(0.5, 2): a scale tween, not x', short: 'expoScale()', prop: 'scale', ease: 'expoScale(0.5, 2)' },
] as const;

const mount: Mount = (el, { preview }) => {
  const lanes = LANES.map((lane) => {
    const row = document.createElement('div');
    row.className = 'lane';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = preview ? lane.short : lane.label;
    const box = document.createElement('div');
    box.className = lane.prop === 'scale' ? 'box round' : 'box';
    row.append(label, box);
    el.append(row);
    return { ...lane, row, box };
  });

  const tweens: gsap.core.Tween[] = [];
  const ctx = gsap.context(() => {
    for (const lane of lanes) {
      const travel = Math.max(40, lane.row.clientWidth - 36);
      const vars: gsap.TweenVars = { duration: 2.4, ease: lane.ease, repeat: -1, repeatDelay: 0.6 };
      tweens.push(
        lane.prop === 'scale'
          ? gsap.fromTo(lane.box, { scale: 0.5 }, { ...vars, scale: 2 })
          : gsap.fromTo(lane.box, { x: 0 }, { ...vars, x: travel }),
      );
    }
  }, el);

  let onClick: (() => void) | undefined;
  let btn: HTMLButtonElement | undefined;
  if (!preview) {
    btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Restart';
    onClick = () => tweens.forEach((t) => t.restart());
    btn.addEventListener('click', onClick);
    el.append(btn);
  }

  return () => {
    if (btn && onClick) btn.removeEventListener('click', onClick);
    ctx.revert();
  };
};

export default mount;
