// A button that leans toward the pointer once it is within a radius: distance2D measures the gap
import { animate, distance2D, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="field${preview ? '' : ' full'}">
      <div class="zone"></div>
      <button class="buy">Buy now</button>
      <div class="cursor"></div>
    </div>`;
  const field = el.querySelector<HTMLElement>('.field')!;
  const zone = el.querySelector<HTMLElement>('.zone')!;
  const button = el.querySelector<HTMLElement>('.buy')!;
  const cursor = el.querySelector<HTMLElement>('.cursor')!;
  let radius = 90;
  let pull = 0.5;
  let p: ReturnType<typeof panel> | undefined;
  let showDistance: ((v: string | number) => void) | undefined;
  const ac = new AbortController();

  const centre = (): { x: number; y: number } => ({ x: field.clientWidth / 2, y: field.clientHeight / 2 });
  const sizeZone = (): void => {
    zone.style.width = zone.style.height = `${radius * 2}px`;
  };

  // `at` is the pointer in field coordinates.
  const follow = (at: { x: number; y: number }): void => {
    const c = centre();
    const d = distance2D(at, c);
    showDistance?.(`${Math.round(d)}px`);
    // Outside the radius nothing happens; inside, the closer the pointer, the stronger the pull.
    const near = d < radius ? 1 - d / radius : 0;
    zone.dataset.near = near > 0 ? 'on' : 'off';
    animate(button, { x: (at.x - c.x) * near * pull * 1.6, y: (at.y - c.y) * near * pull * 1.6 }, { type: 'spring', bounce: 0.25, visualDuration: 0.3 });
  };
  const leave = (): void => {
    zone.dataset.near = 'off';
    animate(button, { x: 0, y: 0 }, { type: 'spring', bounce: 0.5, visualDuration: 0.5 });
  };

  const scope = scopeMotion(el, () => {
    sizeZone();
    if (preview) {
      // A fake cursor drifts in and out of the zone on a loop.
      const c = centre();
      animate(0, 1, {
        duration: 7,
        repeat: Infinity,
        ease: 'linear',
        onUpdate: (t) => {
          const a = t * Math.PI * 2;
          const reach = 40 + 70 * (0.5 + 0.5 * Math.cos(a * 2));
          const at = { x: c.x + Math.cos(a) * reach, y: c.y + Math.sin(a) * reach * 0.7 };
          cursor.style.transform = `translate(${at.x}px, ${at.y}px)`;
          follow(at);
        },
      });
    } else {
      cursor.remove();
      hint(el, 'Move the pointer toward the button. Inside the dashed circle it leans toward you, harder the closer you get, and springs back when you leave.');
      p = panel(el);
      showDistance = p.readout('distance', '-');
      p.slider('radius (px)', { min: 40, max: 160, step: 5, value: radius }, (v) => { radius = v; sizeZone(); });
      p.slider('pull', { min: 0.1, max: 1, step: 0.05, value: pull }, (v) => { pull = v; });
      field.addEventListener('pointermove', (e) => {
        const r = field.getBoundingClientRect();
        follow({ x: e.clientX - r.left, y: e.clientY - r.top });
      }, { signal: ac.signal });
      field.addEventListener('pointerleave', leave, { signal: ac.signal });
    }
  });

  return () => { scope.cancel(); ac.abort(); p?.dispose(); };
};

export default mount;
