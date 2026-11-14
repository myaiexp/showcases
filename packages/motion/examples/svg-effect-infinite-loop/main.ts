// A loading outline: svgEffect pathLength and pathOffset on a rect, with pathSpacing left unset so the loop wraps
import { animate, motionValue, scopeMotion, svgEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="pill${preview ? '' : ' big'}">
      <svg viewBox="0 0 200 56"><rect class="track" x="2" y="2" width="196" height="52" rx="26"/><rect class="runner" x="2" y="2" width="196" height="52" rx="26"/></svg>
      <span>Generating report...</span>
    </div>`;
  const pathLength = motionValue(0.25);
  const pathOffset = motionValue(0);
  let cancel: VoidFunction = () => {};
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    // pathSpacing is never set: Motion works it out so a shorter dash repeats cleanly when the offset wraps.
    cancel = svgEffect('.runner', { pathLength, pathOffset });
    let loop = animate(pathOffset, [0, 1], { duration: 2, ease: 'linear', repeat: Infinity });
    if (!preview) {
      hint(el, 'The segment is a fraction of the outline, moved by pathOffset from 0 to 1 on repeat. Change its length or speed.');
      p = panel(el);
      p.slider('length %', { min: 5, max: 90, step: 5, value: 25 }, (v) => pathLength.set(v / 100));
      p.slider('seconds per lap', { min: 0.5, max: 5, step: 0.5, value: 2 }, bind((v: number) => {
        loop.stop();
        loop = animate(pathOffset, [0, 1], { duration: v, ease: 'linear', repeat: Infinity });
      }));
    }
  });
  return () => { scope.cancel(); cancel(); p?.dispose(); };
};

export default mount;
