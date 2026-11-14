// Tap to select, drag to move: distance2D (or distance on one axis) decides when a press has turned into a drag
import { animate, distance, distance2D, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { at } from '../../shared/where.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const HUES = [210, 20, 140];

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="tray${preview ? '' : ' full'}">
      ${HUES.map((h) => `<div class="photo" style="background:linear-gradient(135deg,hsl(${h} 60% 45%),hsl(${h + 50} 70% 62%))"><b>&#10003;</b></div>`).join('')}
    </div>
    <code class="read"></code>`;
  const photos = [...el.querySelectorAll<HTMLElement>('.photo')];
  const read = el.querySelector<HTMLElement>('.read')!;
  let threshold = 8;
  let axisOnly = false;
  let p: ReturnType<typeof panel> | undefined;
  const ac = new AbortController();

  const scope = scopeMotion(el, (s) => {
    for (const photo of photos) {
      photo.addEventListener('pointerdown', (down) => {
        const start = { x: down.clientX, y: down.clientY };
        let dragging = false;
        const onMove = (e: PointerEvent): void => {
          const now = { x: e.clientX, y: e.clientY };
          // Measure how far the pointer has moved since it went down.
          const moved = axisOnly ? distance(start.x, now.x) : distance2D(start, now);
          if (!dragging && moved > threshold) {
            dragging = true;
            animate(photo, { scale: 1.1 }, { duration: 0.15 });
          }
          read.textContent = `${axisOnly ? 'distance' : 'distance2D'} = ${moved.toFixed(0)}px of ${threshold}px: ${dragging ? 'dragging' : 'still a tap'}`;
          if (dragging) animate(photo, { x: now.x - start.x, y: now.y - start.y }, { duration: 0 });
        };
        const onUp = s.bind((): void => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          if (dragging) {
            animate(photo, { x: 0, y: 0, scale: 1 }, { type: 'spring', bounce: 0.4, visualDuration: 0.4 });
          } else {
            const on = photo.dataset.on !== 'yes';
            photo.dataset.on = on ? 'yes' : 'no';
            read.textContent = on ? 'tap: selected' : 'tap: unselected';
            animate(photo, { scale: [1, 0.92, 1] }, { duration: 0.25 });
          }
        });
        window.addEventListener('pointermove', onMove, { signal: ac.signal });
        window.addEventListener('pointerup', onUp, { signal: ac.signal });
      }, { signal: ac.signal });
    }

    if (preview) {
      // A tap, then a drag, on the middle photo: same pointer, two outcomes.
      loopGesture(el, signal, async (pt) => {
        const target = photos[1]!;
        const c = at(el, target);
        await pt.tap(target, c, 0.15);
        await pt.wait(0.7);
        await pt.drag(target, c, { x: c.x + 20, y: c.y - 24 }, 0.7);
        await pt.wait(0.7);
      }, 0.4);
    } else {
      hint(el, 'Click a photo: it ticks. Press and nudge it a few pixels: still a tap. Move past the threshold and it lifts and follows you. Switch to distance to measure along the x axis only.');
      p = panel(el);
      p.slider('threshold (px)', { min: 2, max: 60, step: 1, value: threshold }, (v) => { threshold = v; });
      p.select('measure', ['distance2D', 'distance (x only)'] as const, 'distance2D', (v) => { axisOnly = v !== 'distance2D'; });
    }
  });
  return () => { scope.cancel(); ac.abort(); p?.dispose(); };
};

export default mount;
