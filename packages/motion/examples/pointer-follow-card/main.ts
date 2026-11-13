// Motion card that eases toward the pointer inside a zone
import { animate } from 'motion';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const zone = document.createElement('div');
  zone.className = preview ? 'zone small' : 'zone';
  const card = document.createElement('div');
  card.className = 'card';
  card.textContent = 'Drag';
  zone.append(card);
  el.append(zone);
  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Uses animate() on each pointer event for smooth trailing';
    el.append(hint);
  }

  let current: { stop(): void } | undefined;
  // The card sits centred by CSS; x and y are offsets from that centre, clamped to the zone.
  const moveTo = (clientX: number, clientY: number): void => {
    const rect = zone.getBoundingClientRect();
    const maxX = (rect.width - card.offsetWidth) / 2;
    const maxY = (rect.height - card.offsetHeight) / 2;
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    current?.stop();
    current = animate(
      card,
      { x: Math.max(-maxX, Math.min(x, maxX)), y: Math.max(-maxY, Math.min(y, maxY)) },
      { duration: 0.3, ease: 'easeOut' },
    );
  };

  const onPointer = (e: PointerEvent): void => moveTo(e.clientX, e.clientY);
  const onTouch = (e: TouchEvent): void => {
    e.preventDefault();
    const t = e.touches[0];
    if (t) moveTo(t.clientX, t.clientY);
  };
  zone.addEventListener('pointermove', onPointer);
  zone.addEventListener('touchmove', onTouch, { passive: false });

  // A preview takes no input, so the card wanders between corners by itself.
  let timer = 0;
  if (preview) {
    let step = 0;
    const tick = (): void => {
      const rect = zone.getBoundingClientRect();
      const fx = step % 2 === 0 ? 0.2 : 0.8;
      const fy = step % 4 < 2 ? 0.25 : 0.75;
      step++;
      moveTo(rect.left + rect.width * fx, rect.top + rect.height * fy);
    };
    tick();
    timer = window.setInterval(tick, 700);
  }

  return () => {
    window.clearInterval(timer);
    current?.stop();
    zone.removeEventListener('pointermove', onPointer);
    zone.removeEventListener('touchmove', onTouch);
  };
};

export default mount;
