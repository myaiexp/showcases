// A photo viewer: pinch to zoom between 1x and 4x with elastic ends, and drag to pan, on one element
import { animate, drag, pinch, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="viewer${preview ? '' : ' big'}"><div class="photo"><i class="sun"></i><i class="hill a"></i><i class="hill b"></i><i class="tree"></i><i class="tree t2"></i></div></div>`;
  const viewer = el.querySelector<HTMLElement>('.viewer')!;
  const photo = el.querySelector<HTMLElement>('.photo')!;

  let stops: VoidFunction[] = [];
  let withDrag = true;
  let readout: ((v: string) => void) | undefined;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    for (const s of stops) s();
    stops = [
      // scale limits with elastic ends; rotate: false keeps the photo upright.
      pinch(
        photo,
        () => ({ onPinch: (_e, info) => readout?.(`${info.scale.toFixed(2)}x`) }),
        { scale: { min: 1, max: 4 }, rotate: false, elastic: 0.25 },
      ),
    ];
    // Drag and pinch on the same element: lifting one finger hands over to a drag without a jump.
    if (withDrag) stops.push(drag(photo, { momentum: false, constraints: viewer, elastic: 0.1 }));
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  const reset = (): void => {
    scope.run(() => animate(photo, { scale: 1, x: 0, y: 0 }, { type: 'spring', bounce: 0.15, visualDuration: 0.5 }));
  };
  if (!preview) {
    hint(el, 'Touch: pinch with two fingers. Desktop: hold Ctrl and scroll over the photo (or pinch a trackpad). Zoom stops at 1x and 4x with a stretchy bounce.');
    p = panel(el);
    readout = p.readout('gesture scale');
    p.toggle('drag to pan', true, (v) => {
      withDrag = v;
      scope.run(arm);
    });
    p.button('Reset', reset);
  } else {
    let zoomIn = true;
    loopGesture(el, signal, async (g) => {
      const r = viewer.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      const c = { x: r.left - f.left + r.width * 0.55, y: r.top - f.top + r.height * 0.45 };
      if (zoomIn) await g.pinch(photo, c, { fromGap: 36, toGap: 120 }, 0.9);
      else await g.pinch(photo, c, { fromGap: 120, toGap: 36 }, 0.7);
      zoomIn = !zoomIn;
      await g.wait(0.7);
      if (zoomIn) reset();
    }, 0.2);
  }

  return () => {
    for (const s of stops) s();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
