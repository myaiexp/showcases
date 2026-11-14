// A photo grid whose pictures are painted (and faded in) only once their tile nears the viewport
import { animate, delay, inView, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

/** Draws a procedural "photo" (sky, sun, hills) from a seed. Stands in for an image download. */
function paint(canvas: HTMLCanvasElement, seed: number): void {
  const ctx = canvas.getContext('2d')!;
  const w = (canvas.width = 120);
  const h = (canvas.height = 120);
  const hue = (seed * 53) % 360;
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, `hsl(${hue} 70% 35%)`);
  sky.addColorStop(1, `hsl(${(hue + 40) % 360} 80% 70%)`);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,230,.9)';
  ctx.beginPath();
  ctx.arc(30 + ((seed * 37) % 60), 32, 12, 0, Math.PI * 2);
  ctx.fill();
  for (let layer = 0; layer < 2; layer++) {
    ctx.fillStyle = `hsl(${(hue + 180) % 360} ${40 + layer * 10}% ${22 - layer * 8}%)`;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 10) ctx.lineTo(x, 70 + layer * 18 + Math.sin(x / 18 + seed * (layer + 1)) * 12);
    ctx.lineTo(w, h);
    ctx.fill();
  }
}

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<p class="count"></p><div class="grid"></div>';
  const grid = el.querySelector<HTMLElement>('.grid')!;
  grid.classList.toggle('full', !preview);
  const count = el.querySelector<HTMLElement>('.count')!;
  const total = preview ? 18 : 30;
  for (let i = 0; i < total; i++) {
    const photo = document.createElement('div');
    photo.className = 'photo';
    photo.append(document.createElement('canvas'));
    grid.append(photo);
  }
  let loaded = 0;
  let stop: VoidFunction = () => {};
  const cleanups: VoidFunction[] = [];

  const scope = scopeMotion(el, ({ bind }) => {
    const arm = bind((): void => {
      stop();
      loaded = 0;
      grid.querySelectorAll<HTMLElement>('.photo').forEach((p) => {
        p.classList.remove('loaded');
        p.querySelector('canvas')!.style.opacity = '0';
      });
      count.textContent = `0 of ${total} loaded`;
      // margin: start loading a little before the tile is actually visible.
      stop = inView('.photo', bind((photo: Element) => {
        const index = [...grid.children].indexOf(photo);
        // A real page would fetch here; a delay stands in for the network.
        delay(bind(() => {
          const canvas = photo.querySelector('canvas')!;
          paint(canvas, index + 1);
          photo.classList.add('loaded');
          animate(canvas, { opacity: [0, 1] }, { duration: 0.6 });
          count.textContent = `${++loaded} of ${total} loaded`;
        }), 0.3 + Math.random() * 0.5);
      }), { root: grid, margin: '0px 0px 40px 0px' });
    });
    arm();
    if (preview) {
      autoScroll(grid, { duration: 5 });
      const again = (): void => { arm(); delay(again, 10); };
      delay(again, 10);
    } else {
      hint(el, 'Scroll down. Pictures are only painted once their tile is within 40px of the bottom edge; the counter shows how many were actually loaded.');
      const p = panel(el);
      p.button('Unload all', arm);
      cleanups.push(() => p.dispose());
    }
  });
  return () => { scope.cancel(); stop(); cleanups.forEach((c) => c()); };
};

export default mount;
