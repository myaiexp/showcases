// Two identical motions, one per engine, with a button that hogs the main thread
import { animate, createTimer, cubicBezier, waapi } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const dist = preview ? 150 : 250;
  const lanes = document.createElement('div');
  lanes.className = 'lanes';
  const mk = (label: string, cls: string): HTMLElement => {
    const lane = document.createElement('div');
    lane.className = 'lane';
    const cap = document.createElement('code');
    cap.textContent = label;
    const sq = document.createElement('div');
    sq.className = `sq ${cls}`;
    lane.append(cap, sq);
    lanes.append(lane);
    return sq;
  };
  const $waapi = mk('waapi.animate()', 'waapi');
  const $js = mk('animate()', 'js');
  el.append(lanes);

  // Same curve both ways: native cubic-bezier for WAAPI, cubicBezier() for the JS engine.
  const waapiAnim = waapi.animate($waapi, {
    translate: dist,
    rotate: 180,
    alternate: true,
    loop: true,
    ease: 'cubic-bezier(0, 0, .58, 1)',
  });
  const jsAnim = animate($js, {
    x: dist,
    rotate: 180,
    ease: cubicBezier(0, 0, 0.58, 1),
    alternate: true,
    loop: true,
  });

  // A busy loop on every tick keeps the main thread occupied while the timer plays.
  const blockCPU = createTimer({
    onUpdate: () => {
      const end = Date.now() + 100;
      while (Date.now() < end) Math.random() * Math.random();
    },
    autoplay: false,
  });

  if (!preview) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    let busy = false;
    const label = (): void => {
      btn.textContent = busy ? 'Free the CPU' : 'Block the CPU';
    };
    label();
    btn.addEventListener('click', () => {
      busy = !busy;
      if (busy) blockCPU.play();
      else blockCPU.pause();
      label();
    });
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'opacity, transform, translate, scale and rotate can run off the main thread in WAAPI.';
    el.append(btn, note);
  }

  return () => {
    blockCPU.revert();
    jsAnim.revert();
    waapiAnim.revert();
  };
};

export default mount;
