// Two boxes loop side by side, one on the compositor (transform) and one on the main thread (left); freeze the page and compare
import { animate, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="lanes">
      <section class="fast"><header><b>transform</b><span>off the main thread</span></header><div class="track"><i class="box"></i></div></section>
      <section class="slow"><header><b>left</b><span>needs the main thread</span></header><div class="track"><i class="box"></i></div></section>
      <section class="beat"><header><b>JS heartbeat</b><span class="tick">0</span></header></section>
    </div>
    <p class="status">Page is free</p>`;
  el.classList.toggle('is-full', !preview);
  const fast = el.querySelector<HTMLElement>('.fast .box')!;
  const slow = el.querySelector<HTMLElement>('.slow .box')!;
  const tick = el.querySelector<HTMLElement>('.tick')!;
  const status = el.querySelector<HTMLElement>('.status')!;
  const track = el.querySelector<HTMLElement>('.track')!;

  let freezeMs = 1000;
  let ui: ReturnType<typeof panel> | undefined;
  let timer = 0;

  const scope = scopeMotion(el, () => {
    const range = track.clientWidth - (preview ? 28 : 40);
    const loop = { duration: 1.4, ease: 'easeInOut' as const, repeat: Infinity, repeatType: 'reverse' as const };
    // x is an independent transform. Motion hands it to the browser, which animates it on the compositor.
    animate(fast, { x: [0, range] }, loop);
    // left changes layout, so it has to be redone on the main thread for every frame.
    animate(slow, { left: [0, range] }, loop);
    // A number driven by JavaScript frames: it stops whenever the main thread does.
    let n = 0;
    animate(0, 1, { duration: 0.05, repeat: Infinity, onUpdate: () => (tick.textContent = String(++n)) });
  });

  if (!preview) {
    ui = panel(el);
    ui.button('Block the main thread', () => {
      status.textContent = 'Blocking the main thread...';
      status.classList.add('busy');
      // Wait a moment so the label paints first, then spin in a loop that does nothing.
      timer = window.setTimeout(() => {
        const end = performance.now() + freezeMs;
        while (performance.now() < end) { /* busy */ }
        status.textContent = 'Page is free';
        status.classList.remove('busy');
      }, 80);
    });
    ui.slider('freeze (ms)', { min: 300, max: 3000, step: 100, value: freezeMs }, (v) => (freezeMs = v));
    hint(el, 'Press the button. For the length of the freeze the left-moving box and the heartbeat stand still, while the transform box keeps gliding.');
  }

  return () => {
    window.clearTimeout(timer);
    scope.cancel();
    ui?.dispose();
  };
};

export default mount;
