// Physics2DPlugin: a particle burst driven by velocity, angle, gravity and friction
import { gsap } from 'gsap';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Physics2DPlugin);

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const origin = document.createElement('div');
  origin.className = 'origin';
  stage.append(origin);
  el.append(stage);

  const settings = { gravity: 500, friction: 0.05 };
  const count = preview ? 18 : 40;

  const burst = (): void => {
    // Not in a context: each burst makes new tweens, and a context would keep them all.
    // They are killed by hand in the cleanup.
    {
      const dots: HTMLElement[] = [];
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.background = `hsl(${gsap.utils.random(20, 60)} 90% 60%)`;
        origin.append(dot);
        dots.push(dot);
      }
      dots.forEach((dot) => {
        gsap.to(dot, {
          duration: 2,
          physics2D: {
            velocity: gsap.utils.random(250, 550),
            angle: gsap.utils.random(-125, -55), // negative angles point up
            gravity: settings.gravity,
            friction: settings.friction,
          },
          opacity: 0,
          ease: 'power1.in',
          onComplete: () => dot.remove(),
        });
      });
    }
  };

  let timer = 0;
  if (preview) {
    burst();
    timer = window.setInterval(burst, 1600);
  } else {
    const controls = document.createElement('div');
    controls.className = 'controls';
    const slider = (label: string, key: keyof typeof settings, min: number, max: number, step: number): void => {
      const wrap = document.createElement('label');
      const out = document.createElement('span');
      const input = document.createElement('input');
      input.type = 'range';
      input.min = String(min);
      input.max = String(max);
      input.step = String(step);
      input.value = String(settings[key]);
      out.textContent = String(settings[key]);
      input.addEventListener('input', () => {
        settings[key] = Number(input.value);
        out.textContent = input.value;
      });
      wrap.append(`${label} `, input, ' ', out);
      controls.append(wrap);
    };
    slider('gravity', 'gravity', 0, 1000, 10);
    slider('friction', 'friction', 0, 0.3, 0.01);
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Burst';
    btn.addEventListener('click', burst);
    controls.append(btn);
    el.append(controls);
    burst();
  }

  return () => {
    window.clearInterval(timer);
    gsap.killTweensOf(Array.from(origin.children));
    origin.replaceChildren();
  };
};

export default mount;
