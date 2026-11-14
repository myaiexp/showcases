// Perspective explorer: a shared parent perspective versus transformPerspective per card, plus perspective-origin
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TURNS = [55, 0, -55];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rows">
      <div class="label">perspective on the parent: one shared vanishing point</div>
      <div class="scene shared"><i class="vp"></i></div>
      <div class="label">transformPerspective on each card: its own</div>
      <div class="scene each"></div>
    </div>`;
  el.classList.toggle('is-full', !preview);
  const shared = el.querySelector<HTMLElement>('.shared')!;
  const each = el.querySelector<HTMLElement>('.each')!;
  const vp = el.querySelector<HTMLElement>('.vp')!;
  const sharedTiles: HTMLElement[] = [];
  const eachTiles: HTMLElement[] = [];
  for (const [scene, list] of [[shared, sharedTiles], [each, eachTiles]] as const) {
    TURNS.forEach((_, i) => {
      const t = document.createElement('div');
      t.className = 'tile';
      t.style.setProperty('--hue', String(210 + i * 50));
      t.textContent = String(i + 1);
      scene.append(t);
      list.push(t);
    });
  }

  let distance = 500;
  let originX = 50;
  let originY = 50;

  // Row 1 is CSS: `perspective` and `perspective-origin` on the parent, plain rotateY on the children.
  const setDistance = (px: number): void => {
    distance = px;
    shared.style.perspective = `${px}px`;
    // Row 2 is Motion: transformPerspective goes inside each card's own transform, in the right place.
    TURNS.forEach((deg, i) => animate(eachTiles[i]!, { rotateY: deg, transformPerspective: px }, { duration: 0 }));
  };
  const setOrigin = (x: number, y: number): void => {
    originX = x;
    originY = y;
    shared.style.perspectiveOrigin = `${x}% ${y}%`;
    vp.style.left = `${x}%`;
    vp.style.top = `${y}%`;
  };

  const scope = scopeMotion(el, () => {
    TURNS.forEach((deg, i) => animate(sharedTiles[i]!, { rotateY: deg }, { duration: 0 }));
    setDistance(distance);
    setOrigin(originX, originY);

    if (preview) {
      // Slowly zoom the camera in and out, and drift the vanishing point sideways.
      animate(1500, 220, { duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', onUpdate: setDistance });
      animate(15, 85, { duration: 5.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', onUpdate: (x) => setOrigin(x, originY) });
    }
  });

  let ui: ReturnType<typeof panel> | undefined;
  if (!preview) {
    ui = panel(el);
    ui.slider('perspective (px)', { min: 150, max: 1500, step: 10, value: distance }, setDistance);
    ui.slider('origin x %', { min: 0, max: 100, step: 1, value: originX }, (v) => setOrigin(v, originY));
    ui.slider('origin y %', { min: 0, max: 100, step: 1, value: originY }, (v) => setOrigin(originX, v));
    hint(el, 'Lower the perspective for stronger depth. In the top row the outer cards lean towards the dot (the shared vanishing point); in the bottom row each card has its own, so they all look alike.');
  }

  return () => {
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
