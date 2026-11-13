// Getting started in vanilla JS: a bouncing, draggable logo that spins on click, as the docs page does it
import { animate, utils, createDraggable, spring } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const NS = 'http://www.w3.org/2000/svg';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const logo = document.createElementNS(NS, 'svg');
  logo.setAttribute('class', 'logo');
  logo.setAttribute('viewBox', '0 0 100 100');
  const rect = document.createElementNS(NS, 'rect');
  rect.setAttribute('width', '100');
  rect.setAttribute('height', '100');
  rect.setAttribute('rx', '14');
  rect.setAttribute('fill', 'currentColor');
  const label = document.createElementNS(NS, 'text');
  label.setAttribute('x', '50');
  label.setAttribute('y', '66');
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('font-size', '48');
  label.setAttribute('font-weight', '700');
  label.setAttribute('fill', 'var(--bg)');
  label.textContent = 'JS';
  logo.append(rect, label);
  stage.append(logo);
  el.append(stage);

  const $logo = utils.$(logo)[0] as SVGElement;
  let rotations = 0;

  // Bounce animation loop
  const bounce = animate($logo, {
    scale: [
      { to: 1.25, ease: 'inOut(3)', duration: 200 },
      { to: 1, ease: spring({ bounce: 0.7 }) },
    ],
    loop: true,
    loopDelay: 250,
  });

  // The logo can be dragged around its own centre
  const drag = createDraggable($logo, {
    container: [0, 0, 0, 0],
    releaseEase: spring({ bounce: 0.7 }),
  });

  let spin: ReturnType<typeof animate> | null = null;
  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'rotations: 0';
  const rotateLogo = (): void => {
    rotations++;
    button.textContent = `rotations: ${rotations}`;
    spin = animate($logo, { rotate: rotations * 360, ease: 'out(4)', duration: 1500 });
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(rotateLogo, 2200);
  } else {
    button.addEventListener('click', rotateLogo);
    el.append(button);
  }

  return () => {
    window.clearInterval(timer);
    button.removeEventListener('click', rotateLogo);
    spin?.revert();
    bounce.revert();
    drag.revert();
  };
};

export default mount;
