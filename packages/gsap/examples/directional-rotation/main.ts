// Four arrows go from 170 to -170 degrees: a plain tween and the _short, _cw and _ccw suffixes
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const MODES = ['-170', '-170_short', '-170_cw', '-170_ccw'];

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'demo compact' : 'demo';
  const arrows: HTMLElement[] = [];
  const reads: HTMLElement[] = [];
  for (const mode of MODES) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    const dial = document.createElement('div');
    dial.className = 'dial';
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    dial.append(arrow);
    const label = document.createElement('code');
    label.textContent = `"${mode}"`;
    const read = document.createElement('span');
    read.className = 'read';
    cell.append(dial, label, read);
    root.append(cell);
    arrows.push(arrow);
    reads.push(read);
  }
  el.append(root);

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
    // every arrow starts at 170 degrees
    tl.set(arrows, { rotation: 170, transformOrigin: '50% 100%' }, 0);
    arrows.forEach((arrow, i) => {
      tl.to(arrow, {
        rotation: MODES[i], // the suffix picks the direction; no plugin to load
        duration: 2,
        ease: 'power1.inOut',
        onUpdate() {
          const travelled = Math.abs(Number(gsap.getProperty(arrow, 'rotation')) - 170);
          (reads[i] as HTMLElement).textContent = `${Math.round(travelled)}° travelled`;
        },
      }, 0.4);
    });
  }, el);

  return () => ctx.revert();
};

export default mount;
