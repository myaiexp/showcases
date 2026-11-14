// A conic-gradient border whose --angle variable is animated by animate()
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="plan">
      <div class="halo"></div>
      <div class="ring">
        <div class="inner">
          <small>PRO</small>
          <strong>$12<span>/mo</span></strong>
          <p>Unlimited projects</p>
        </div>
      </div>
    </div>`;

  let seconds = 3;
  let anim: { stop: () => void; speed: number } | undefined;

  const scope = scopeMotion(el, () => {
    const spin = (): void => {
      anim?.stop();
      // Hybrid animate() can animate CSS variables. The stylesheet does the rest:
      // conic-gradient(from var(--angle), ...).
      anim = animate('.ring, .halo', { '--angle': ['0deg', '360deg'] }, { duration: seconds, ease: 'linear', repeat: Infinity });
    };
    spin();

    if (preview) return;
    const p = panel(el);
    p.slider('seconds per turn', { min: 0.5, max: 8, step: 0.5, value: seconds }, (v) => { seconds = v; spin(); });
    hint(el, 'The border is a conic gradient that starts at --angle. Nothing but that one number changes.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
