// The official tickGSAPWhileHidden() helper, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/tickGSAPWhileHidden
// Browsers pause requestAnimationFrame() while a tab is hidden. This keeps GSAP updating at a
// reduced rate (about 2fps, because setInterval is throttled) while hidden.
// Typing change: the docs keep the listener and interval id as properties on the function
// itself (tickGSAPWhileHidden.fn / .id); here they are module-level variables.
let fn: (() => void) | undefined;
let id: number | undefined;

export function tickGSAPWhileHidden(value?: boolean): void {
  if (value === false) {
    fn && document.removeEventListener('visibilitychange', fn);
    return clearInterval(id);
  }
  const onChange = (): void => {
    clearInterval(id);
    if (document.hidden) {
      gsap.ticker.lagSmoothing(0); // keep the time moving forward (don't adjust for lag)
      id = setInterval(gsap.ticker.tick, 500) as unknown as number;
    } else {
      gsap.ticker.lagSmoothing(500, 33); // restore lag smoothing
    }
  };
  document.addEventListener('visibilitychange', onChange);
  fn = onChange;
  onChange(); // in case the document is currently hidden.
}
