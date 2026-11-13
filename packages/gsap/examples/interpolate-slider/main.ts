// A progress slider fed to gsap.utils.interpolate() to blend an object (size, radius, colour) and a colour array
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const START = { size: 40, radius: 4, rotate: 0, color: '#e5484d' };
const END = { size: 130, radius: 65, rotate: 180, color: '#3e63dd' };
const STOPS = ['#e5484d', '#f5d90a', '#30a46c', '#3e63dd'];

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const shape = document.createElement('div');
  shape.className = 'shape';
  stage.append(shape);
  const bar = document.createElement('div');
  bar.className = 'bar';
  const readout = document.createElement('p');
  readout.className = 'readout';
  el.append(stage, bar);

  // Two reusable functions: one blends two objects, one walks along an array of colours.
  const blend = gsap.utils.interpolate(START, END);
  const along = gsap.utils.interpolate(STOPS);

  const render = (p: number): void => {
    const v = blend(p);
    shape.style.width = shape.style.height = `${v.size}px`;
    shape.style.borderRadius = `${v.radius}px`;
    shape.style.background = v.color;
    shape.style.transform = `rotate(${v.rotate}deg)`;
    bar.style.background = along(p);
    readout.textContent = `progress ${p.toFixed(2)}  size ${v.size.toFixed(0)}  colour ${v.color}`;
  };

  const ctx = gsap.context(() => {
    const proxy = { p: 0 };
    render(0);
    if (preview) {
      gsap.to(proxy, { p: 1, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => render(proxy.p) });
    }
  }, el);

  if (!preview) {
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = '0';
    slider.addEventListener('input', () => render(Number(slider.value)));
    el.append(slider, readout);
  }

  return () => ctx.revert();
};

export default mount;
