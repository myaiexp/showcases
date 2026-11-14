// A route whose dashes are set with pathLength and pathSpacing and slid with pathOffset
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const ROUTE = 'M30 160 C 30 110, 90 130, 100 90 S 150 40, 190 70 S 230 30, 260 30';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="map">
      <svg viewBox="0 0 290 190">
        <path class="street" d="M0 120H290M0 60H290M80 0V190M170 0V190M240 0V190"/>
        <path class="faint" d="${ROUTE}"/>
        <path class="route" d="${ROUTE}"/>
        <circle class="pin a" cx="30" cy="160" r="7"/>
        <circle class="pin b" cx="260" cy="30" r="7"/>
      </svg>
    </div>`;

  const dash = { length: 0.03, gap: 0.03, seconds: 1.2 };

  const scope = scopeMotion(el, () => {
    const march = (): void => {
      // One dash plus one gap is the pattern's period: slide by exactly that and it loops.
      animate('.route', { pathLength: dash.length, pathSpacing: dash.gap, pathOffset: [0, -(dash.length + dash.gap)] }, { duration: dash.seconds, ease: 'linear', repeat: Infinity });
    };
    march();

    if (preview) return;
    const p = panel(el);
    p.slider('dash', { min: 0.01, max: 0.1, step: 0.005, value: dash.length }, (v) => { dash.length = v; march(); });
    p.slider('gap', { min: 0.005, max: 0.1, step: 0.005, value: dash.gap }, (v) => { dash.gap = v; march(); });
    p.slider('seconds', { min: 0.3, max: 4, step: 0.1, value: dash.seconds }, (v) => { dash.seconds = v; march(); });
    hint(el, 'pathLength is the dash, pathSpacing the gap, pathOffset the slide. All three are fractions of the whole route.');
    return () => p.dispose();
  });

  return () => scope.cancel();
};

export default mount;
