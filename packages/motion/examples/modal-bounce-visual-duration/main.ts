// A dialog opening and closing with a duration-based spring: visualDuration and bounce
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="screen">
      <div class="scrim"></div>
      <div class="dialog">
        <h4>Delete this photo?</h4>
        <p>It will be gone for good.</p>
        <div class="actions"><button class="btn" tabindex="-1">Cancel</button><button class="btn danger" tabindex="-1">Delete</button></div>
      </div>
    </div>`;

  const spring = { bounce: 0.4, visualDuration: 0.5 };
  let open = false;
  let stage = el.querySelector('.dialog') as HTMLElement;
  stage.style.opacity = '0';

  const scope = scopeMotion(el, () => {
    const toggle = (): void => {
      open = !open;
      stage = el.querySelector('.dialog') as HTMLElement;
      animate(stage, { scale: open ? [0.5, 1] : 0.5, y: open ? [30, 0] : 20, opacity: open ? 1 : 0 }, {
        type: 'spring',
        bounce: open ? spring.bounce : 0,
        visualDuration: open ? spring.visualDuration : 0.25,
        // A spring can overshoot opacity past 1, so the fade gets a plain tween.
        opacity: { type: 'tween', duration: 0.15 },
      });
      animate('.scrim', { opacity: open ? 1 : 0 }, { duration: 0.2 });
    };

    if (preview) {
      const tick = (): void => {
        toggle();
        delay(tick, open ? 2 : 0.9);
      };
      delay(tick, 0.5);
      return;
    }
    const p = panel(el);
    p.slider('bounce', { min: -1, max: 1, step: 0.05, value: spring.bounce }, (v) => { spring.bounce = v; });
    p.slider('visualDuration', { min: 0.1, max: 1.5, step: 0.05, value: spring.visualDuration }, (v) => { spring.visualDuration = v; });
    p.button('Open / close', toggle);
    hint(el, 'Bounce 0.8 wobbles, 0 stops dead on target, and below zero it settles slowly with no overshoot. visualDuration keeps the main movement the same length throughout.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
