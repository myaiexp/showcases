// One tween driven by play, pause, reverse, restart, timeScale and a progress scrubber
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

function button(text: string, onClick: () => void, parent: HTMLElement): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = 'btn';
  b.textContent = text;
  b.addEventListener('click', onClick);
  parent.append(b);
  return b;
}

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  const box = document.createElement('div');
  box.className = 'box';
  track.append(box);
  el.append(track);

  let scrub: HTMLInputElement | undefined;
  let readout: HTMLElement | undefined;
  let tween!: gsap.core.Tween;

  const ctx = gsap.context(() => {
    tween = gsap.to(box, {
      x: 180,
      rotation: 360,
      duration: 3,
      ease: 'power1.inOut',
      paused: !preview,
      repeat: preview ? -1 : 0,
      yoyo: preview,
      onUpdate: () => {
        if (scrub) scrub.value = String(tween.progress());
        if (readout) update();
      },
    });
  }, el);

  function update(): void {
    if (!readout) return;
    readout.textContent =
      `time ${tween.time().toFixed(2)}s  progress ${tween.progress().toFixed(2)}  ` +
      `timeScale ${tween.timeScale().toFixed(1)}  reversed ${tween.reversed()}  paused ${tween.paused()}`;
  }

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    button('play()', () => tween.play(), bar);
    button('pause()', () => tween.pause(), bar);
    button('resume()', () => tween.resume(), bar);
    button('reverse()', () => tween.reverse(), bar);
    button('restart()', () => tween.restart(), bar);
    button('seek(1.5)', () => tween.seek(1.5), bar);

    const row = document.createElement('div');
    row.className = 'bar';
    const sl = document.createElement('label');
    sl.textContent = 'progress() ';
    scrub = document.createElement('input');
    scrub.type = 'range';
    scrub.min = '0';
    scrub.max = '1';
    scrub.step = '0.001';
    scrub.value = '0';
    scrub.addEventListener('input', () => {
      // Scrubbing sets the playhead; pause first so playback does not fight the thumb.
      tween.pause().progress(Number(scrub?.value));
      update();
    });
    sl.append(scrub);
    const tl = document.createElement('label');
    tl.textContent = 'timeScale() ';
    const ts = document.createElement('input');
    ts.type = 'range';
    ts.min = '0.1';
    ts.max = '3';
    ts.step = '0.1';
    ts.value = '1';
    ts.addEventListener('input', () => {
      tween.timeScale(Number(ts.value));
      update();
    });
    tl.append(ts);
    row.append(sl, tl);

    readout = document.createElement('code');
    readout.className = 'readout';
    el.append(bar, row, readout);
    update();
  }

  return () => {
    ctx.revert();
  };
};

export default mount;
