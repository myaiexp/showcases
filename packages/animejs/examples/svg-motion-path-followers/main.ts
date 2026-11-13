// createMotionPath followers: several arrows ride one path, each started at a different offset
import { animate, svg } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';
const PATH = 'M40 56 C 40 8, 112 8, 152 56 S 264 104, 264 56 S 192 8, 152 56 S 40 104, 40 56 Z';

const mount: Mount = (el, { preview }) => {
  const root = document.createElementNS(NS, 'svg');
  root.setAttribute('viewBox', '0 0 304 112');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', PATH);
  path.setAttribute('class', 'track');
  root.append(path);

  const makeArrow = (cls: string): SVGElement => {
    const arrow = document.createElementNS(NS, 'polygon');
    arrow.setAttribute('points', '-7,-5 7,0 -7,5');
    arrow.setAttribute('class', `arrow ${cls}`);
    root.append(arrow);
    return arrow;
  };
  const followers = [makeArrow('a1'), makeArrow('a2'), makeArrow('a3')];
  const offsets = [0, 0.33, 0.66];
  const lead = makeArrow('lead');
  el.append(root);

  // Each follower spreads the createMotionPath() tween parameters (translateX, translateY, rotate)
  const run = (target: SVGElement, offset: number) =>
    animate(target, {
      ease: 'linear',
      duration: 6000,
      loop: true,
      ...svg.createMotionPath(path, offset),
    });
  const animations = followers.map((f, i) => run(f, offsets[i] ?? 0));
  let leadAnimation = run(lead, 0.15);

  if (!preview) {
    const label = document.createElement('label');
    label.className = 'offset';
    const text = document.createElement('span');
    text.textContent = 'lead offset: 0.15';
    const input = document.createElement('input');
    input.type = 'range';
    input.min = '0';
    input.max = '1';
    input.step = '0.01';
    input.value = '0.15';
    input.addEventListener('input', () => {
      leadAnimation.revert();
      leadAnimation = run(lead, Number(input.value));
      text.textContent = `lead offset: ${input.value}`;
    });
    label.append(text, input);
    el.append(label);
  }

  return () => {
    animations.forEach(a => a.revert());
    leadAnimation.revert();
  };
};

export default mount;
