// A three-slide show whose total length is set on the whole sequence, stretching every segment
import { animate, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const SLIDES = [
  { title: 'Plan', color: '#5b6cff' },
  { title: 'Build', color: '#e0558a' },
  { title: 'Ship', color: '#2fb67c' },
];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="show">
      <div class="slides">${SLIDES.map((s, i) => `<div class="slide s${i}" style="background:${s.color}">${s.title}</div>`).join('')}</div>
      <div class="bar"><i></i></div>
    </div>`;

  const scope = scopeMotion(el, (s) => {
    const natural = animate(SLIDES.flatMap((_, i) => slide(i)), { autoplay: false });
    const naturalSeconds = natural.duration;
    natural.cancel();

    let timeline: ReturnType<typeof animate> | undefined;
    const build = (seconds: number): void => {
      const progress = timeline?.progress ?? 0;
      timeline?.cancel();
      // `duration` on the sequence itself scales every segment to fit this length.
      timeline = animate(SLIDES.flatMap((_, i) => slide(i)), {
        duration: seconds,
        repeat: Infinity,
        onUpdate: (t) => {
          el.querySelector<HTMLElement>('.bar i')!.style.transform = `scaleX(${t / seconds})`;
        },
      });
      timeline.progress = progress;
    };
    build(preview ? 4 : 6);
    if (preview) return;

    const p = panel(el);
    p.readout('natural length', `${naturalSeconds.toFixed(1)}s`);
    p.slider('Whole show (s)', { min: 2, max: 14, step: 1, value: 6 }, (v) => s.run(() => build(v)));
    hint(el, 'Each slide fades in and out as its own segment. The sequence on its own would last the natural length; setting duration squeezes or stretches all of it at once.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

function slide(i: number): AnimationSequence {
  const sel = `.s${i}`;
  return [
    [sel, { opacity: [0, 1], x: [30, 0] }, { duration: 0.5 }],
    [sel, { opacity: [1, 0], x: [0, -30] }, { duration: 0.5, at: '+1' }],
  ];
}

export default mount;
