// A card that picks its layout from its own size: resize() on an element, with writes batched on frame.render
import { animate, frame, resize, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="box${preview ? '' : ' full'}">
      <div class="item">
        <span class="size"></span>
        <div class="pic"></div>
        <div class="text"><div class="name">Trail runner</div><div class="desc">Light, grippy and quick to dry. Made for mud.</div><div class="price">$89</div></div>
      </div>
    </div>`;
  const box = el.querySelector<HTMLElement>('.box')!;
  const item = el.querySelector<HTMLElement>('.item')!;
  const size = el.querySelector<HTMLElement>('.size')!;
  let p: ReturnType<typeof panel> | undefined;
  const cleanups: VoidFunction[] = [];

  const scope = scopeMotion(el, ({ bind }) => {
    // The first call arrives straight away with the element's current size.
    const stop = resize(item, (target, { width, height }) => {
      // Reads came from the observer; the DOM writes go in the render step.
      frame.render(() => {
        const layout = width < 170 ? 'compact' : width < 300 ? 'cozy' : 'wide';
        target.setAttribute('data-layout', layout);
        (target as HTMLElement).style.borderRadius = `${Math.round(width / 12)}px`;
        size.textContent = `${Math.round(width)} x ${Math.round(height)}`;
      });
    });
    cleanups.push(stop);

    if (preview) {
      animate(box, { width: [110, 238] }, { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' });
    } else {
      hint(el, 'Drag the corner of the dashed box. Below 170px the card is compact, then cosy, and from 300px it turns wide with a description.');
      p = panel(el);
      for (const [label, w] of [['Small', 150], ['Medium', 250], ['Large', 460]] as const) {
        p.button(label, bind(() => animate(box, { width: Math.min(w, el.clientWidth - 20) }, { type: 'spring', bounce: 0.2, visualDuration: 0.5 })));
      }
    }
  });
  return () => { scope.cancel(); cleanups.forEach((c) => c()); p?.dispose(); };
};

export default mount;
