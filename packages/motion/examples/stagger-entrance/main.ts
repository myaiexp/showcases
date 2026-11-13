// Motion staggered entrance row with a replay button
import { animate, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';
  const items: HTMLElement[] = [];
  for (let i = 0; i < 7; i++) {
    const item = document.createElement('div');
    item.className = 'item';
    items.push(item);
    row.append(item);
  }
  el.append(row);

  let current: { stop(): void } | undefined;
  let raf = 0;
  const play = (): void => {
    current?.stop();
    cancelAnimationFrame(raf);
    // Reset first, then animate on the next frame so the reset is visible.
    for (const item of items) {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    }
    raf = requestAnimationFrame(() => {
      current = animate(
        items,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
        { delay: stagger(0.08), duration: 0.5, ease: 'easeOut' },
      );
    });
  };

  let timer = 0;
  if (preview) {
    timer = window.setInterval(play, 2000);
  } else {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Replay stagger';
    btn.addEventListener('click', play);
    el.append(btn);
  }
  play();

  return () => {
    window.clearInterval(timer);
    cancelAnimationFrame(raf);
    current?.stop();
  };
};

export default mount;
