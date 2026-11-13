// A timeline that stops itself with addPause and fires call() callbacks at fixed points
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const track = document.createElement('div');
  track.className = 'track';
  const box = document.createElement('div');
  box.className = 'box';
  track.append(box);
  const status = document.createElement('p');
  status.className = 'status';
  const log = document.createElement('ul');
  log.className = 'log';
  el.append(track, status);
  if (!preview) el.append(log);

  const note = (text: string): void => {
    if (preview) return;
    const li = document.createElement('li');
    li.textContent = text;
    log.prepend(li);
    while (log.children.length > 6) log.lastElementChild?.remove();
  };

  let pending: gsap.core.Tween | undefined;
  let resume: HTMLButtonElement | undefined;
  const cleanups: Array<() => void> = [];
  const ctx = gsap.context((self) => {
    const W = preview ? 170 : 260;
    track.style.width = `${W + 40}px`;
    const tl = gsap.timeline({ repeat: preview ? -1 : 0, repeatDelay: 0.4, defaults: { duration: 0.8, ease: 'power2.inOut' } });

    const onPause = (name: string): void => {
      status.textContent = `Paused at "${name}". ${preview ? '' : 'Press Continue.'}`;
      note(`addPause: paused at ${tl.time().toFixed(2)}s`);
      if (resume) resume.disabled = false;
      // In the card nobody can press the button, so resume by itself after a beat. The
      // delayedCall is new each pause, so it stays out of the context (which would hold
      // every one until unmount) and the cleanup kills it by handle.
      if (preview) {
        pending?.kill();
        self.ignore(() => (pending = gsap.delayedCall(0.8, () => tl.resume())));
      }
    };

    tl.call(() => (status.textContent = 'Running...'), [], 0)
      .to(box, { x: W / 3, backgroundColor: '#34c38f' })
      .addPause('+=0', onPause, ['first stop'])
      .to(box, { x: (W * 2) / 3, backgroundColor: '#f2a33a' })
      .call(() => note('call(): fired mid-sequence'), [], '-=0.3')
      .addPause('+=0', onPause, ['second stop'])
      .to(box, { x: W, backgroundColor: '#d05bd0' })
      .call(() => {
        status.textContent = 'Done.';
        note('call(): finished');
      });

    if (preview) return;
    const row = document.createElement('div');
    row.className = 'row';
    resume = document.createElement('button');
    resume.className = 'btn btn-primary';
    resume.textContent = 'Continue';
    resume.disabled = true;
    resume.addEventListener('click', () => {
      if (resume) resume.disabled = true;
      tl.resume();
    });
    const restart = document.createElement('button');
    restart.className = 'btn';
    restart.textContent = 'Restart';
    restart.addEventListener('click', () => {
      if (resume) resume.disabled = true;
      tl.restart();
    });
    row.append(resume, restart);
    el.append(row);
    cleanups.push(() => row.remove());
  }, el);

  return () => {
    pending?.kill();
    for (const fn of cleanups) fn();
    ctx.revert();
  };
};

export default mount;
