// Builds a field of looping, randomised particles inside a container and returns the animations
import { animate, utils, type JSAnimation } from 'animejs';

export const addParticle = (container: HTMLElement, spread = 1): { el: HTMLElement; anim: JSAnimation } => {
  const el = document.createElement('div');
  el.className = 'particle';
  container.append(el);
  const anim = animate(el, {
    x: utils.random(-10, 10, 2) * spread + 'rem',
    y: utils.random(-3, 3, 2) * spread + 'rem',
    scale: [{ from: 0, to: 1 }, { to: 0 }],
    delay: utils.random(0, 1000),
    loop: true,
  });
  return { el, anim };
};

export const buildField = (): HTMLElement => {
  const field = document.createElement('div');
  field.className = 'field';
  return field;
};
