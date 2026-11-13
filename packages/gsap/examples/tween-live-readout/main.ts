// One repeating yoyo tween with every timing getter printed live
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { btn, h } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const out = h('pre', 'readout', '', wrap);

  const ctx = gsap.context(() => {
    const tween = gsap.to(box, {
      x: () => track.clientWidth - 36,
      rotation: 180,
      duration: 1.5,
      ease: 'back.inOut(2)',
      repeat: preview ? -1 : 3,
      repeatDelay: 0.3,
      yoyo: true,
      paused: !preview,
      onUpdate: show,
      onComplete: show,
    });

    function show(): void {
      const f = (n: number): string => n.toFixed(2).padStart(6);
      const rows = [
        `time()          ${f(tween.time())}   duration()      ${f(tween.duration())}`,
        `totalTime()     ${f(tween.totalTime())}   totalDuration() ${f(tween.totalDuration())}`,
        `progress()      ${f(tween.progress())}   totalProgress() ${f(tween.totalProgress())}`,
        `ratio           ${f(tween.ratio)}   iteration()     ${String(tween.iteration()).padStart(6)}`,
        `isActive()      ${String(tween.isActive()).padEnd(6)}   reversed()      ${String(tween.reversed())}`,
      ];
      out.textContent = preview ? rows.slice(1, 4).join('\n') : rows.join('\n');
    }
    show();

    if (preview) return;
    const bar = h('div', 'bar', '', wrap);
    btn('play()', () => tween.play(), bar);
    btn('pause()', () => tween.pause(), bar);
    btn('restart()', () => tween.restart(), bar);
    h(
      'p',
      'note',
      'ratio is the progress after the ease: with back.inOut it leaves the 0 to 1 range, progress() never does. time() restarts each repeat, totalTime() keeps counting.',
      wrap,
    );
    // Buttons call plain playhead methods, so no tweens are created outside the context.
  }, el);

  return () => ctx.revert();
};

export default mount;
