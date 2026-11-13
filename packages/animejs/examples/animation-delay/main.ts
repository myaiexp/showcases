// delay: one global delay applied to every property of an animation, adjustable live
import { animate } from 'animejs';
import type { JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const dot = document.createElement('div');
  dot.className = 'dot';
  stage.append(dot);
  el.append(stage);

  let anim: JSAnimation;
  const build = (delay: number): void => {
    anim?.revert();
    // delay is a playback setting: it waits before every property starts, on each loop.
    anim = animate(dot, { x: '12rem', scale: 1.8, delay, loop: true, alternate: true, duration: 900 });
  };
  build(500);
  if (preview) return () => anim.revert();

  const label = document.createElement('label');
  label.className = 'control';
  const text = document.createElement('span');
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '2000';
  slider.step = '100';
  slider.value = '500';
  const show = (): void => {
    text.textContent = `delay: ${slider.value}`;
  };
  show();
  const onInput = (): void => {
    show();
    build(Number(slider.value));
  };
  slider.addEventListener('input', onInput);
  label.append(text, slider);
  el.append(label);

  return () => {
    slider.removeEventListener('input', onInput);
    anim.revert();
  };
};

export default mount;
