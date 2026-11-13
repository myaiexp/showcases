// Draggable release feel: four lanes with different releaseEase / damping settings
import { createDraggable, spring } from 'animejs';
import type { EasingParam } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  el.append(stage);

  // `ease` is the lane's own release setting; a lane without one is only throwable.
  const spr = spring({ stiffness: 150, damping: 15 });
  const lanes = [
    { label: 'default outQuint', settings: {}, ease: 'outQuint' as EasingParam },
    { label: 'releaseEase: outElastic', settings: { releaseEase: 'outElastic' as const }, ease: 'outElastic' as EasingParam },
    { label: 'releaseEase: spring()', settings: { releaseEase: spr }, ease: spr as EasingParam },
    // releaseDamping only changes the throw itself: animateInView has no way to show it.
    { label: 'releaseDamping: 5 (throw only)', settings: { releaseDamping: 5 }, ease: undefined },
  ];

  const draggables = lanes.map((lane, i) => {
    const item = document.createElement('div');
    item.className = lane.ease ? 'item' : 'item throw-only';
    item.style.left = `${6 + i * 25}%`;
    item.style.setProperty('--hue', String(i * 70 + 200));
    stage.append(item);
    if (!preview) {
      // labels would overlap in the narrow card
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = lane.label;
      tag.style.left = `${6 + i * 25}%`;
      stage.append(tag);
    }
    return { d: createDraggable(item, { container: stage, ...lane.settings }), ease: lane.ease };
  });

  const timeouts = new Set<number>();
  const later = (fn: () => void, ms: number): void => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      fn();
    }, ms);
    timeouts.add(id);
  };

  // Lanes with an ease return using that same ease as the animateInView ease.
  const bringBack = (duration: number): void => {
    draggables.forEach(({ d, ease }) => {
      if (ease) d.animateInView(duration, 0, ease);
    });
  };
  // Push the squares well past the bottom edge (stage is 170px, squares sit at top: 10px).
  const fling = (): void => {
    draggables.forEach(({ d, ease }, i) => {
      if (!ease) return;
      d.x = i % 2 ? 30 : -10;
      d.y = 175;
    });
  };

  let timer = 0;
  if (preview) {
    const cycle = (): void => {
      fling();
      later(() => bringBack(1100), 500);
    };
    cycle();
    timer = window.setInterval(cycle, 2600);
  } else {
    const panel = document.createElement('div');
    panel.className = 'panel';
    const hint = document.createElement('span');
    hint.className = 'label';
    hint.textContent = 'The release settings only act when you throw a square and let go. Throw them at the walls.';
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = 'Demo: push out, then animateInView() with each lane\'s ease';
    b.addEventListener('click', () => {
      fling();
      later(() => bringBack(1100), 400);
    });
    panel.append(hint, b);
    el.append(panel);
  }

  return () => {
    window.clearInterval(timer);
    timeouts.forEach((id) => window.clearTimeout(id));
    timeouts.clear();
    draggables.forEach(({ d }) => d.revert());
  };
};

export default mount;
