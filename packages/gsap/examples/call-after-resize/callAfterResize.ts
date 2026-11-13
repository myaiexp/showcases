// The official callAfterResize() helper, copied from the docs (typed; takes the window to listen on)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/callAfterResize
// Waits to call your function until a certain time has passed since the user STOPPED resizing
// (default 0.2 seconds). It returns the handler in case you want to removeEventListener() later.
// Typing change: the docs listen on the global `window`; here the window is a parameter
// (defaulting to window) so the demo can listen on an iframe's window it can resize.
export function callAfterResize(func: () => void, delay?: number, target: Window = window): () => void {
  const dc = gsap.delayedCall(delay || 0.2, func).pause();
  const handler = (): void => {
    dc.restart(true);
  };
  target.addEventListener('resize', handler);
  return handler;
}
