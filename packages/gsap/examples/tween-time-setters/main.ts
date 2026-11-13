// Four setters on one paused repeating tween: time, totalTime, totalProgress and iteration
import { gsap } from 'gsap';
import type { Mount } from '@/types.ts';
import { h, slider } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const track = h('div', 'track', '', wrap);
  const box = h('div', 'box', '', track);
  const out = h('pre', 'readout', '', wrap);

  let timer = 0;
  const sliders: Record<string, HTMLInputElement> = {};
  const ctx = gsap.context(() => {
    const tween = gsap.to(box, {
      x: () => track.clientWidth - 36,
      rotation: 180,
      duration: 1,
      ease: 'power1.inOut',
      repeat: 3,
      yoyo: true,
      paused: !preview,
      onUpdate: show,
      onComplete: () => {
        if (preview) timer = window.setTimeout(() => tween.restart(), 800);
      },
    });

    function show(): void {
      out.textContent =
        `time() ${tween.time().toFixed(2)} of ${tween.duration()}    iteration() ${tween.iteration()} of ${tween.repeat() + 1}\n` +
        `totalTime() ${tween.totalTime().toFixed(2)} of ${tween.totalDuration()}    totalProgress() ${tween.totalProgress().toFixed(2)}`;
      if (sliders.time) {
        sliders.time.value = String(tween.time());
        sliders.total!.value = String(tween.totalTime());
        sliders.tp!.value = String(tween.totalProgress());
        sliders.iter!.value = String(tween.iteration());
      }
    }
    show();

    if (preview) return;
    const bar = h('div', 'bar', '', wrap);
    sliders.time = slider('time(0 to 1)', 0, 1, 0.01, 0, (v) => { tween.time(v); show(); }, bar);
    sliders.total = slider('totalTime(0 to 4)', 0, 4, 0.01, 0, (v) => { tween.totalTime(v); show(); }, bar);
    sliders.tp = slider('totalProgress()', 0, 1, 0.01, 0, (v) => { tween.totalProgress(v); show(); }, bar);
    sliders.iter = slider('iteration(1 to 4)', 1, 4, 1, 1, (v) => { tween.iteration(v); show(); }, bar);
    h(
      'p',
      'note',
      'The tween is paused. time() is clamped to one cycle (0 to 1s) and shows the position inside the current iteration; totalTime() and totalProgress() cover all four cycles; iteration() jumps whole cycles.',
      wrap,
    );
  }, el);

  return () => {
    clearTimeout(timer);
    ctx.revert();
  };
};

export default mount;
