// engine.update(): with useDefaultMainLoop off, nothing moves until you tick the engine yourself
import { animate, engine } from 'animejs';
import type { JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

type Mode = 'every frame' | 'every 20th frame' | 'stopped';

const mount: Mount = (el, { preview }) => {
  const field = document.createElement('div');
  field.className = 'field';
  const dots = Array.from({ length: preview ? 6 : 10 }, () => {
    const d = document.createElement('div');
    d.className = 'dot';
    field.append(d);
    return d;
  });
  el.append(field);

  if (preview) {
    // The engine is shared with every other card, so the preview never touches it.
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = 'engine.update()';
    el.append(caption);
    const anims: JSAnimation[] = dots.map((d, i) =>
      animate(d, { y: [-20, 20], duration: 700, delay: i * 90, loop: true, alternate: true, ease: 'inOutSine' }),
    );
    const pulse = animate(caption, { opacity: [0.35, 1], duration: 500, loop: true, alternate: true });
    return () => {
      anims.forEach((a) => a.revert());
      pulse.revert();
    };
  }

  // Global engine settings changed here are restored in the cleanup below.
  engine.useDefaultMainLoop = false;
  engine.pause(); // stop a loop that may already be running
  const anims = dots.map((d, i) =>
    animate(d, { y: [-30, 30], rotate: 360, duration: 1400, delay: i * 90, loop: true, alternate: true, ease: 'inOutSine' }),
  );

  let mode: Mode = 'every frame';
  let frames = 0;
  let updates = 0;
  let raf = 0;
  const tick = (): void => {
    engine.update();
    updates++;
  };
  const loop = (): void => {
    raf = requestAnimationFrame(loop);
    frames++;
    if (mode === 'every frame' || (mode === 'every 20th frame' && frames % 20 === 0)) tick();
  };
  raf = requestAnimationFrame(loop);

  const readout = document.createElement('pre');
  readout.className = 'readout';
  const show = (): void => {
    readout.textContent = `engine.useDefaultMainLoop: ${engine.useDefaultMainLoop}\nmy loop: ${mode}\nengine.update() calls: ${updates}`;
  };
  show();
  const timer = window.setInterval(show, 100);

  const panel = document.createElement('div');
  panel.className = 'panel';
  const cleanups: (() => void)[] = [];
  const button = (text: string, fn: () => void): void => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = text;
    btn.addEventListener('click', fn);
    cleanups.push(() => btn.removeEventListener('click', fn));
    panel.append(btn);
  };
  (['every frame', 'every 20th frame', 'stopped'] as Mode[]).forEach((m) => button(m, () => (mode = m)));
  button('Call engine.update() once', tick);
  el.append(readout, panel);

  return () => {
    cancelAnimationFrame(raf);
    window.clearInterval(timer);
    cleanups.forEach((fn) => fn());
    anims.forEach((a) => a.revert());
    // Hand the loop back to the engine for every other example.
    engine.useDefaultMainLoop = true;
    engine.resume();
  };
};

export default mount;
