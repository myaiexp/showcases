// A zoomable map whose pins cancel the zoom with transformValue(() => 1 / scale.get())
import { animate, motionValue, scopeMotion, styleEffect, transformValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PINS = [
  { name: 'Cafe', x: 28, y: 36 },
  { name: 'Park', x: 70, y: 60 },
  { name: 'Station', x: 52, y: 26 },
  { name: 'Market', x: 38, y: 72 },
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="view${preview ? '' : ' big'}"><div class="map">${PINS.map((p) => `<div class="pin" style="left:${p.x}%;top:${p.y}%;translate:-50% -100%"><b>${p.name}</b><i></i></div>`).join('')}</div></div>`;
  const scale = motionValue(1);
  const keep = motionValue(1); // 1 = counter the zoom, 0 = let pins grow with the map
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    // transformValue tracks every .get() inside it, so it re-runs when scale or keep change.
    const inverse = transformValue(() => (keep.get() ? 1 / scale.get() : 1));
    cancels.push(styleEffect('.map', { scale }));
    cancels.push(styleEffect(el.querySelectorAll('.pin'), { scale: inverse }));
    if (preview) {
      animate(scale, [1, 2.4, 1], { duration: 6, repeat: Infinity, ease: 'easeInOut' });
    } else {
      hint(el, 'Zoom the map. With the toggle on, each pin scales by 1 / zoom and stays readable; turn it off and the pins grow with everything else.');
      p = panel(el);
      p.slider('zoom', { min: 100, max: 300, step: 5, value: 100 }, (v) => scale.set(v / 100));
      p.toggle('Keep pin size', true, (v) => keep.set(v ? 1 : 0));
      p.button('Zoom in', bind(() => { animate(scale, 3, { type: 'spring', bounce: 0.2, visualDuration: 0.8 }); }));
      p.button('Zoom out', bind(() => { animate(scale, 1, { type: 'spring', bounce: 0.2, visualDuration: 0.8 }); }));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
